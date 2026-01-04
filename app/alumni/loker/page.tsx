
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import LowonganKerja from '@/models/LowonganKerja';
import AlumniLokerClient from './AlumniLokerClient';

export const dynamic = 'force-dynamic';

export default async function AlumniLokerPage() {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    const userId = (session.user as any).id;
    await connectDB();
    
    // Fetch Lokers created by this user
    const lokers = await LowonganKerja.find({ posted_by: userId }).sort({ createdAt: -1 }).lean();

    // Serialize
    const serializedLokers = lokers.map((l: any) => ({
        ...l,
        _id: l._id.toString(),
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
        deadline: l.deadline ? l.deadline.toISOString() : null,
        posted_by: l.posted_by.toString(),
    }));

    return <AlumniLokerClient initialLokers={serializedLokers} />;
}
