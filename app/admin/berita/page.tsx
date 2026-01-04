import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import Link from "next/link";
import { FaPlus, FaEdit } from "react-icons/fa";
import DeleteBeritaButton from "@/components/admin/DeleteBeritaButton";

export const dynamic = 'force-dynamic';

export default async function AdminBeritaPage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const berita = await Berita.find({}).sort({ createdAt: -1 });

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manajemen Berita</h1>
            <Link href="/admin/berita/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold flex items-center gap-2">
                <FaPlus /> Tambah Berita
            </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4">Judul</th>
                        <th className="p-4">Kategori</th>
                        <th className="p-4">Tanggal</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {berita.map((item) => (
                        <tr key={item._id.toString()} className="hover:bg-gray-50">
                            <td className="p-4 font-medium">{item.judul}</td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{item.kategori}</span></td>
                            <td className="p-4 text-sm text-gray-500">{new Date(item.published_at).toLocaleDateString('id-ID')}</td>
                            <td className="p-4">
                                {item.status === 'approved' ? 
                                    <span className="text-green-600 font-bold text-xs">Published</span> : 
                                    <span className="text-yellow-600 font-bold text-xs">Draft</span>
                                }
                            </td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                <Link 
                                    href={`/admin/berita/edit/${item._id.toString()}`}
                                    className="text-blue-600 hover:bg-blue-100 p-2 rounded block"
                                    title="Edit Berita"
                                >
                                    <FaEdit />
                                </Link>
                                <DeleteBeritaButton id={item._id.toString()} title={item.judul} />
                            </td>
                        </tr>
                    ))}
                    {berita.length === 0 && (
                        <tr><td colSpan={5} className="p-8 text-center text-gray-500">Belum ada berita.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
