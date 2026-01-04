import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/db';
import LowonganKerja from "@/models/LowonganKerja";
import { redirect } from "next/navigation";
import LokerClient from "./LokerClient";

export const dynamic = 'force-dynamic';

export default async function AdminLokerPage() {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
        redirect('/admin');
    }

    await connectDB();
    const loker = await LowonganKerja.find({}).sort({ createdAt: -1 }).lean();

    const serializableLoker = loker.map((l: any) => ({
        ...l,
        _id: l._id.toString(),
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
        deadline: l.deadline ? l.deadline.toISOString() : null,
        posted_by: l.posted_by ? l.posted_by.toString() : null
    }));

    return <LokerClient initialLoker={serializableLoker} />;
}
