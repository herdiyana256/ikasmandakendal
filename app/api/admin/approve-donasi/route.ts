import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Donasi from '@/models/Donasi';
import AdminLog from '@/models/AdminLog';
import { requireAdmin } from '@/middleware/roleCheck';

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (session instanceof NextResponse) return session;

  try {
    await connectDB();
    const { donasiId, action, reason } = await request.json();

    const donasi = await Donasi.findById(donasiId);
    if (!donasi) {
      return NextResponse.json({ error: 'Donasi not found' }, { status: 404 });
    }

    if (action === 'approve') {
      donasi.status = 'active'; // Donasi active upon approval
      donasi.approved_by = (session as any).user.id;
      donasi.approved_at = new Date();
    } else if (action === 'reject') {
      donasi.status = 'rejected';
    } else if (action === 'close') {
      donasi.status = 'closed';
    }

    await donasi.save();

    await AdminLog.create({
      admin_id: (session as any).user.id,
      action,
      target_type: 'donasi',
      target_id: donasiId,
      details: reason,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
