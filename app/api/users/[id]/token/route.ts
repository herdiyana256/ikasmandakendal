import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/models/User';
import crypto from 'crypto';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    await connectDB();

    // Generate random API Token (32 bytes hex)
    const token = crypto.randomBytes(32).toString('hex');

    const updatedUser = await User.findByIdAndUpdate(id, { api_token: token }, { new: true });

    if (!updatedUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'API Token generated successfully', api_token: token }, { status: 200 });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
