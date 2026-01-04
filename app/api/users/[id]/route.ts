import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/models/User';

// Force recompile
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;
    const userData = session?.user as any;

    // Authorization: Allow if IT/Admin OR if it's the user themselves
    const isOwner = userData?.id === id;
    const isAdmin = ['admin', 'IT'].includes(userData?.role);

    if (!session || (!isOwner && !isAdmin)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    
    // Fields allowed for everyone (Self-update)
    const updateData: any = {
        nama_depan: body.nama_depan,
        nama_belakang: body.nama_belakang,
        no_hp: body.no_hp,
        tempat_lahir: body.tempat_lahir,
        tanggal_lahir: body.tanggal_lahir,
        alamat_lengkap: body.alamat_lengkap,
        kota: body.kota,
        status_pekerjaan: body.status_pekerjaan || body.pekerjaan, // Handle both key names if needed
        instagram: body.instagram,
        linkedin: body.linkedin,
        angkatan: body.angkatan,
        foto_profil: body.foto_profil 
    };

    // Fields allowed only for Admin/IT
    if (isAdmin) {
        if (body.role) updateData.role = body.role;
        if (typeof body.is_verified === 'boolean') updateData.is_verified = body.is_verified;
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
        id, 
        { $set: updateData }, 
        { new: true }
    );

    if (!updatedUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Update User Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'IT') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    await connectDB();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
