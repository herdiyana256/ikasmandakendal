
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import AlumniArtikelClient from "./AlumniArtikelClient";

export const dynamic = 'force-dynamic';

export default async function AlumniArtikelPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  await connectDB();
  const userId = (session.user as any).id;

  // Fetch Articles by Author
  const myArticles = await Berita.find({ penulis_id: userId }).sort({ createdAt: -1 }).lean();

  const serializedArticles = myArticles.map((item: any) => ({
    _id: item._id.toString(),
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    penulis_id: item.penulis_id.toString(),
  }));

  return <AlumniArtikelClient initialArticles={serializedArticles} />;
}
