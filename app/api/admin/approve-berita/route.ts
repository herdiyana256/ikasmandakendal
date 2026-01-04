import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Berita from '@/models/Berita';
import AdminLog from '@/models/AdminLog';
import { requireAdmin } from '@/middleware/roleCheck';

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (session instanceof NextResponse) return session;

  try {
    await connectDB();
    const { beritaId, action, reason } = await request.json();

    const berita = await Berita.findById(beritaId);
    if (!berita) {
      return NextResponse.json({ error: 'Berita not found' }, { status: 404 });
    }

    if (action === 'approve') {
      berita.status = 'approved';
      berita.approved_by = (session as any).user.id;
      berita.approved_at = new Date();
    } else if (action === 'reject') {
      berita.status = 'rejected';
      berita.rejection_reason = reason;
    }

    await berita.save();

    // Log admin action
    await AdminLog.create({
      admin_id: (session as any).user.id,
      action,
      target_type: 'berita',
      target_id: beritaId,
      details: reason,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
