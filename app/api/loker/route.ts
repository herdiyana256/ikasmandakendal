import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import LowonganKerja from '@/models/LowonganKerja';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT', 'alumni'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { judul, perusahaan, deskripsi, lokasi, tipe_pekerjaan, gaji_min, gaji_max, requirements, deadline } = body;

    if (!judul || !perusahaan) {
      return NextResponse.json({ message: 'Judul dan Perusahaan wajib diisi' }, { status: 400 });
    }

    await connectDB();

    const newLoker = await LowonganKerja.create({
        judul,
        perusahaan,
        deskripsi,
        lokasi,
        tipe_pekerjaan,
        gaji_min,
        gaji_max,
        requirements,
        deadline,
        posted_by: (session.user as any).id,
        status: ['admin', 'IT'].includes((session.user as any).role) ? 'active' : 'pending'
    });

    return NextResponse.json({ message: 'Lowongan berhasil dibuat', loker: newLoker }, { status: 201 });

  } catch (error) {
    console.error('Error creating loker:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
