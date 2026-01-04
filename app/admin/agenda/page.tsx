import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/db';
import Agenda from "@/models/Agenda";
import { redirect } from "next/navigation";
import AgendaClient from "./AgendaClient";

export const dynamic = 'force-dynamic';

export default async function AdminAgendaPage() {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
        redirect('/admin');
    }

    await connectDB();
    const agenda = await Agenda.find({}).sort({ tanggal_mulai: 1 }).lean();

    const serializableAgenda = agenda.map((a: any) => ({
        ...a,
        _id: a._id.toString(),
        createdAt: a.createdAt.toISOString(),
        updatedAt: a.updatedAt.toISOString(),
        tanggal_mulai: a.tanggal_mulai.toISOString(),
        tanggal_selesai: a.tanggal_selesai ? a.tanggal_selesai.toISOString() : null,
        created_by: a.created_by ? a.created_by.toString() : null
    }));

    return <AgendaClient initialAgenda={serializableAgenda} />;
}
