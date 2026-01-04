import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import LowonganKerja from '@/models/LowonganKerja';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    
    await connectDB();

    const updatedLoker = await LowonganKerja.findByIdAndUpdate(id, body, { new: true });

    if (!updatedLoker) {
        return NextResponse.json({ message: 'Loker not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Lowongan updated successfully', loker: updatedLoker }, { status: 200 });
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
  
      const deletedLoker = await LowonganKerja.findByIdAndDelete(id);
  
      if (!deletedLoker) {
          return NextResponse.json({ message: 'Loker not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Lowongan deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
