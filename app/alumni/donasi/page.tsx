
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Donasi from "@/models/Donasi";
import { FaHandHoldingHeart, FaHistory } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default async function AlumniDonasiPage() {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    await connectDB();
    
    // Fetch Open Donations
    const openDonations = await Donasi.find({ status: 'active' }).sort({ createdAt: -1 }).lean();

    return (
        <div className="max-w-6xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Donasi & Bantuan</h1>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
                    <FaHistory /> Riwayat Donasi Saya
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {openDonations.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center py-10">Belum ada program donasi aktif.</p>
                ) : (
                    openDonations.map((donasi: any) => (
                         <div key={donasi._id.toString()} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition">
                            <div className="h-48 bg-green-50 relative overflow-hidden">
                                {donasi.gambar_url ? (
                                    <img src={donasi.gambar_url} alt={donasi.judul} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-green-300">
                                        <FaHandHoldingHeart size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{donasi.judul}</h3>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-green-600 h-2.5 rounded-full" 
                                            style={{ width: `${Math.min((donasi.terkumpul / donasi.target) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-green-600">Rp {donasi.terkumpul?.toLocaleString('id-ID') || 0}</span>
                                        <span className="text-gray-500">Target: Rp {donasi.target?.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
                                    {donasi.deskripsi}
                                </p>
                                <button className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition">
                                    Donasi Sekarang
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
