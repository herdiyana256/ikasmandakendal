import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Only IT role can create users
    if (!session || (session.user as any).role !== 'IT') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { username, email, password, nama_depan, nama_belakang, role } = body;

    if (!username || !email || !password || !nama_depan || !nama_belakang || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
    });

    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        nama_depan,
        nama_belakang,
        role,
        is_verified: true, // Auto verify if created by Admin
        createdAt: new Date(),
    });

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
