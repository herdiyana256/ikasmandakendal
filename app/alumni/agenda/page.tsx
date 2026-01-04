
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Agenda from "@/models/Agenda";
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default async function AlumniAgendaPage() {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    await connectDB();
    
    // Fetch Upcoming Agendas
    const today = new Date();
    const agendas = await Agenda.find({ tanggal_mulai: { $gte: today } }).sort({ tanggal_mulai: 1 }).lean();

    return (
        <div className="max-w-6xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Agenda Kegiatan Mendatang</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agendas.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center py-10">Belum ada agenda kegiatan mendatang.</p>
                ) : (
                    agendas.map((agenda: any) => (
                        <div key={agenda._id.toString()} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition">
                            <div className="h-48 bg-blue-50 relative overflow-hidden">
                                {agenda.gambar_url ? (
                                    <img src={agenda.gambar_url} alt={agenda.judul} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-blue-300">
                                        <FaCalendarAlt size={48} />
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded text-center shadow-sm">
                                    <p className="text-xs font-bold text-gray-500 uppercase">{new Date(agenda.tanggal_mulai).toLocaleString('id-ID', { month: 'short' })}</p>
                                    <p className="text-xl font-bold text-blue-600">{new Date(agenda.tanggal_mulai).getDate()}</p>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{agenda.judul}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    <span className="truncate">{agenda.lokasi}</span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                                    {agenda.deskripsi}
                                </p>
                                <button className="w-full py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition">
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
