import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized. Admin access required.' },
      { status: 403 }
    );
  }
  
  return session;
}

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized. Please login.' },
      { status: 401 }
    );
  }
  
  return session;
}
