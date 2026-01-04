import connectDB from "@/lib/db";
import LapakAlumni from "@/models/LapakAlumni";
import { FaCheck, FaTimes } from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function AdminLapakPage() {
  await connectDB();
  const lapaks = await LapakAlumni.find({}).sort({ created_at: -1 });

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Lapak Alumni</h1>
            <div className="text-sm text-gray-500">Approve atau tolak listing alumni</div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4">Nama Usaha</th>
                        <th className="p-4">Pemilik</th>
                        <th className="p-4">Kategori</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {lapaks.map((item) => (
                        <tr key={item._id.toString()} className="hover:bg-gray-50">
                            <td className="p-4 font-medium">{item.nama_usaha}</td>
                            <td className="p-4 text-sm">{item.pemilik?.nama || 'Unknown'}</td>
                            <td className="p-4 text-sm">{item.kategori}</td>
                             <td className="p-4">
                                {item.status === 'approved' ? 
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Active</span> : 
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Pending</span>
                                }
                            </td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                <button className="text-green-600 hover:bg-green-100 p-2 rounded" title="Approve"><FaCheck /></button>
                                <button className="text-red-600 hover:bg-red-100 p-2 rounded" title="Reject"><FaTimes /></button>
                            </td>
                        </tr>
                    ))}
                    {lapaks.length === 0 && (
                        <tr><td colSpan={5} className="p-8 text-center text-gray-500">Belum ada lapak alumni.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
