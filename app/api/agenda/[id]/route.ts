import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Agenda from '@/models/Agenda';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { judul, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, gambar_url } = body;

    await connectDB();

    const updatedAgenda = await Agenda.findByIdAndUpdate(id, {
        judul,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        lokasi,
        gambar_url
    }, { new: true });

    if (!updatedAgenda) {
        return NextResponse.json({ message: 'Agenda not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Agenda updated successfully', agenda: updatedAgenda }, { status: 200 });
  } catch (error) {
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
  
      const deletedAgenda = await Agenda.findByIdAndDelete(id);
  
      if (!deletedAgenda) {
          return NextResponse.json({ message: 'Agenda not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Agenda deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
