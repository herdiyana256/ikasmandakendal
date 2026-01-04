import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/db';
import Donasi from "@/models/Donasi";
import { redirect } from "next/navigation";
import DonasiClient from "./DonasiClient";

export const dynamic = 'force-dynamic';

export default async function AdminDonasiPage() {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
        redirect('/admin');
    }

    await connectDB();
    const donasi = await Donasi.find({}).sort({ createdAt: -1 }).lean();

    const serializableDonasi = donasi.map((d: any) => ({
        ...d,
        _id: d._id.toString(),
        createdAt: d.createdAt.toISOString(),
        updatedAt: d.updatedAt.toISOString(),
        deadline: d.deadline ? d.deadline.toISOString() : null,
        approved_by: d.approved_by ? d.approved_by.toString() : null
    }));

    return <DonasiClient initialDonasi={serializableDonasi} />;
}
