import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Berita from '@/models/Berita';
import slugify from 'slugify';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT', 'alumni'].includes((session.user as any).role)) { // Allow alumni to post? Maybe with 'pending' status.
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { judul, konten, kategori, gambar_url, tags, status } = body;

    if (!judul || !konten) {
      return NextResponse.json({ message: 'Judul dan Konten wajib diisi' }, { status: 400 });
    }

    await connectDB();

    // Generate Slug
    let slug = slugify(judul, { lower: true, strict: true });
    let existingBerita = await Berita.findOne({ slug });
    let counter = 1;
    while (existingBerita) {
        slug = `${slugify(judul, { lower: true, strict: true })}-${counter}`;
        existingBerita = await Berita.findOne({ slug });
        counter++;
    }

    const userData = session.user as any;
    const isAutoApprove = ['admin', 'IT'].includes(userData.role);

    const newBerita = await Berita.create({
        judul,
        slug,
        konten,
        kategori,
        gambar_url,
        tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
        penulis: userData.nama_depan + ' ' + userData.nama_belakang,
        penulis_id: userData.id,
        status: isAutoApprove ? (status || 'approved') : 'pending',
        published_at: (isAutoApprove && (status === 'approved' || !status)) ? new Date() : null,
        approved_by: isAutoApprove ? userData.id : null,
        approved_at: isAutoApprove ? new Date() : null,
    });

    return NextResponse.json({ message: 'Berita berhasil dibuat', berita: newBerita }, { status: 201 });

  } catch (error) {
    console.error('Error creating berita:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
