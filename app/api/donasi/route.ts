import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Donasi from '@/models/Donasi';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT', 'alumni'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { nama_campaign, deskripsi, target_amount, deadline, gambar_url, status } = body;

    if (!nama_campaign || !target_amount) {
      return NextResponse.json({ message: 'Nama Campaign dan Target Amount wajib diisi' }, { status: 400 });
    }

    await connectDB();

    const newDonasi = await Donasi.create({
        nama_campaign,
        deskripsi,
        target_amount,
        current_amount: 0,
        deadline,
        gambar_url,
        status: status || 'pending'
    });

    return NextResponse.json({ message: 'Donasi berhasil dibuat', donasi: newDonasi }, { status: 201 });

  } catch (error) {
    console.error('Error creating donasi:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
