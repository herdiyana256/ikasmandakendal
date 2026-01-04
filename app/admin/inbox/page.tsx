
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import LowonganKerja from "@/models/LowonganKerja";
import InboxClient from "./InboxClient";

export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  const session = await getServerSession(authOptions);
  // Optional: Check role again or rely on middleware/layout

  await connectDB();

  // Fetch Pending Berita
  const pendingBerita = await Berita.find({ status: 'pending' })
    .populate('penulis_id', 'nama_depan nama_belakang')
    .sort({ createdAt: -1 })
    .lean();

  // Fetch Pending Loker
  const pendingLoker = await LowonganKerja.find({ status: 'pending' })
    .populate('posted_by', 'nama_depan nama_belakang')
    .sort({ createdAt: -1 })
    .lean();

  // Serialize
  const serializedBerita = pendingBerita.map((item: any) => ({
    _id: item._id.toString(),
    type: 'berita',
    title: item.judul,
    author: item.penulis_id ? `${item.penulis_id.nama_depan} ${item.penulis_id.nama_belakang}` : 'Unknown',
    createdAt: item.createdAt.toISOString(),
    details: item.kategori
  }));

  const serializedLoker = pendingLoker.map((item: any) => ({
    _id: item._id.toString(),
    type: 'loker',
    title: `${item.judul} at ${item.perusahaan}`,
    author: item.posted_by ? `${item.posted_by.nama_depan} ${item.posted_by.nama_belakang}` : 'Unknown',
    createdAt: item.createdAt.toISOString(),
    details: item.lokasi
  }));

  const allItems = [...serializedBerita, ...serializedLoker].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return <InboxClient initialItems={allItems} />;
}
