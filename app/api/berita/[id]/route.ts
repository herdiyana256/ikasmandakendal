import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Berita from '@/models/Berita';
import slugify from 'slugify';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { judul, konten, kategori, gambar_url, tags, status } = body;

    await connectDB();

    const updateData: any = {
        judul,
        konten,
        kategori,
        gambar_url,
        tags: tags && typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : tags,
        status
    };

    if (judul) {
        // Optional: Update slug if title changes? Usually bad for SEO. Let's keep slug stable unless explicitly requested.
        // But for draft it's fine.
    }

    if (status === 'approved') {
        updateData.published_at = new Date();
        updateData.approved_by = (session.user as any).id;
        updateData.approved_at = new Date();
    }

    const updatedBerita = await Berita.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBerita) {
        return NextResponse.json({ message: 'Berita not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Berita updated successfully', berita: updatedBerita }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    await connectDB();

    const deletedBerita = await Berita.findByIdAndDelete(id);

    if (!deletedBerita) {
        return NextResponse.json({ message: 'Berita not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Berita deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
