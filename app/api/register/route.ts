import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
    .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka')
    .regex(/[^a-zA-Z0-9]/, 'Password harus mengandung minimal 1 karakter spesial (@, #, dll)'),
  nama_depan: z.string().min(1, 'Nama depan wajib diisi'),
  nama_belakang: z.string().min(1, 'Nama belakang wajib diisi'),
});

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validasi Zod
    const validationResult = registerSchema.safeParse(body);
    
    if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(err => err.message).join(', ');
        return NextResponse.json(
            { error: errorMessages },
            { status: 400 }
        );
    }

    // Cek apakah user sudah ada
    const existingUser = await User.findOne({
      $or: [{ email: body.email }, { username: body.username }]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username atau email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Buat user baru
    const newUser = await User.create({
      ...body,
      password: hashedPassword,
    });

    return NextResponse.json(
      { 
        message: 'Registrasi berhasil!',
        userId: newUser._id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
