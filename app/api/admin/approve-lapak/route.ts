import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import LapakAlumni from '@/models/LapakAlumni';
import AdminLog from '@/models/AdminLog';
import { requireAdmin } from '@/middleware/roleCheck';

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (session instanceof NextResponse) return session;

  try {
    await connectDB();
    const { lapakId, action, reason } = await request.json();

    const lapak = await LapakAlumni.findById(lapakId);
    if (!lapak) {
      return NextResponse.json({ error: 'Lapak not found' }, { status: 404 });
    }

    if (action === 'approve') {
      lapak.status = 'approved';
      lapak.approved_by = (session as any).user.id;
      lapak.approved_at = new Date();
    } else if (action === 'reject') {
      lapak.status = 'rejected';
      lapak.rejection_reason = reason;
    }

    await lapak.save();

    await AdminLog.create({
      admin_id: (session as any).user.id,
      action,
      target_type: 'lapak',
      target_id: lapakId,
      details: reason,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
