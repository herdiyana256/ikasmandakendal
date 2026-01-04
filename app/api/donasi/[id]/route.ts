import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Donasi from '@/models/Donasi';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    
    await connectDB();

    // If status becomes active/completed, handle approval info
    if (body.status === 'active' || body.status === 'completed') {
        body.approved_by = (session.user as any).id;
        body.approved_at = new Date();
    }

    const updatedDonasi = await Donasi.findByIdAndUpdate(id, body, { new: true });

    if (!updatedDonasi) {
        return NextResponse.json({ message: 'Donasi not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Donasi updated successfully', donasi: updatedDonasi }, { status: 200 });
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
  
      const deletedDonasi = await Donasi.findByIdAndDelete(id);
  
      if (!deletedDonasi) {
          return NextResponse.json({ message: 'Donasi not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Donasi deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
