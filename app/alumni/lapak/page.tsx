
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import LapakAlumni from "@/models/LapakAlumni";
import AlumniLapakClient from "./AlumniLapakClient";

export const dynamic = 'force-dynamic';

export default async function AlumniLapakPage() {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    await connectDB();
    const userId = (session.user as any).id;

    const myLapaks = await LapakAlumni.find({ user_id: userId }).sort({ createdAt: -1 }).lean();

    const serializedLapaks = myLapaks.map((item: any) => ({
        ...item,
        _id: item._id.toString(),
        user_id: item.user_id.toString(),
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
    }));

    return <AlumniLapakClient initialLapaks={serializedLapaks} />;
}
