import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Agenda from '@/models/Agenda';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT', 'alumni'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { judul, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, gambar_url } = body;

    if (!judul || !tanggal_mulai) {
      return NextResponse.json({ message: 'Judul dan Tanggal Mulai wajib diisi' }, { status: 400 });
    }

    await connectDB();

    const newAgenda = await Agenda.create({
        judul,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        lokasi,
        gambar_url,
        created_by: (session.user as any).id,
    });

    return NextResponse.json({ message: 'Agenda berhasil dibuat', agenda: newAgenda }, { status: 201 });

  } catch (error) {
    console.error('Error creating agenda:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
