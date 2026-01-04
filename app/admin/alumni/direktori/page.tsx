import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { FaEye, FaCheck } from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function AdminDirektoriPage() {
  await connectDB();
  const alumni = await User.find({ role: 'alumni' }).sort({ createdAt: -1 });

  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">Direktori Alumni</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4">Nama</th>
                        <th className="p-4">Angkatan</th>
                        <th className="p-4">Pekerjaan</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {alumni.map((user) => (
                        <tr key={user._id.toString()} className="hover:bg-gray-50">
                            <td className="p-4 font-medium">{user.nama_depan} {user.nama_belakang}</td>
                            <td className="p-4">{user.angkatan || '-'}</td>
                            <td className="p-4">{user.status_pekerjaan || '-'}</td>
                             <td className="p-4">
                                {user.is_verified ? 
                                    <span className="text-green-600 font-bold text-xs">Verified</span> : 
                                    <span className="text-yellow-600 font-bold text-xs">Unverified</span>
                                }
                            </td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                <button className="text-blue-600 hover:bg-blue-100 p-2 rounded" title="Detail"><FaEye /></button>
                            </td>
                        </tr>
                    ))}
                    {alumni.length === 0 && (
                         <tr><td colSpan={5} className="p-8 text-center text-gray-500">Belum ada data alumni.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}
