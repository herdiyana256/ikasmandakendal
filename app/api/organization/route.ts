import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Organization from '@/models/Organization';

export async function GET(req: Request) {
    try {
        await connectDB();
        let org = await Organization.findOne();
        
        if (!org) {
            // Initialize if not exists
            org = await Organization.create({
                visi: '',
                misi: [],
                sejarah: '',
                struktur_pengurus: []
            });
        }
        
        return NextResponse.json({ organization: org }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    
    await connectDB();

    body.updated_by = (session.user as any).id;
    body.updatedAt = new Date(); // Force update timestamp

    // Upsert logic
    const org = await Organization.findOneAndUpdate({}, body, { new: true, upsert: true });

    return NextResponse.json({ message: 'Organization updated successfully', organization: org }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
