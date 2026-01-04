import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import AdminLog from '@/models/AdminLog';
import { requireAdmin } from '@/middleware/roleCheck';

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (session instanceof NextResponse) return session;

  try {
    await connectDB();
    const { userId, action, role } = await request.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (action === 'update_role') {
        user.role = role;
        await user.save();
    } else if (action === 'delete') {
        await User.findByIdAndDelete(userId);
    }

    await AdminLog.create({
      admin_id: (session as any).user.id,
      action: action,
      target_type: 'user',
      target_id: userId,
      details: role ? `Changed role to ${role}` : 'User deleted',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
