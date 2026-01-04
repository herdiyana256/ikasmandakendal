
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import LapakAlumni from '@/models/LapakAlumni';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('user_id');

    const query: any = {};
    if (status) query.status = status;
    if (userId) query.user_id = userId;

    const lapaks = await LapakAlumni.find(query)
        .populate('user_id', 'nama_depan nama_belakang email')
        .sort({ createdAt: -1 })
        .lean();
    
    return NextResponse.json(lapaks);
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await request.json();

    const userRole = (session.user as any).role;
    const initialStatus = ['admin', 'IT'].includes(userRole) ? 'approved' : 'pending';

    const newLapak = await LapakAlumni.create({
        ...body,
        user_id: (session.user as any).id,
        status: initialStatus
    });

    return NextResponse.json(newLapak, { status: 201 });
}
