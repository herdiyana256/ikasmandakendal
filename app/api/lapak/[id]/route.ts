
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import LapakAlumni from '@/models/LapakAlumni';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await request.json();
    
    // Authorization Check
    const lapak = await LapakAlumni.findById(params.id);
    if (!lapak) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const user = session.user as any;
    // Allow if owner OR admin
    if (lapak.user_id.toString() !== user.id && !['admin', 'IT'].includes(user.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedLapak = await LapakAlumni.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updatedLapak);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
     const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    
    const lapak = await LapakAlumni.findById(params.id);
    if (!lapak) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const user = session.user as any;
    if (lapak.user_id.toString() !== user.id && !['admin', 'IT'].includes(user.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await LapakAlumni.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
}
