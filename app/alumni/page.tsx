
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import LowonganKerja from "@/models/LowonganKerja";
import Agenda from "@/models/Agenda";
import Donasi from "@/models/Donasi";
// import Lapak from "@/models/Lapak"; // Assuming Lapak model exists or needs creation

export const dynamic = 'force-dynamic';

export default async function AlumniDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  await connectDB();
  const userId = (session.user as any).id; // Make sure user ID is available in session

  // Fetch Stats (Mock logic if models don't support Author filter properly yet)
  const myArticles = await Berita.countDocuments({ author_id: userId });
  const myLoker = await LowonganKerja.countDocuments({ created_by: userId });
  // const myLapak = await Lapak.countDocuments({ owner: userId }); 
  const myLapak = 0; // Placeholder until Lapak model is fully integrated
  const joinedAgenda = 0; // Placeholder
  const totalDonation = 0; // Placeholder

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Ringkasan Aktivitas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Artikel Pribadi</p>
                    <h3 className="text-3xl font-bold text-blue-600">{myArticles}</h3>
                </div>
                <div className="text-blue-200 text-4xl">📝</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Lapak Usaha</p>
                    <h3 className="text-3xl font-bold text-purple-600">{myLapak}</h3>
                </div>
                <div className="text-purple-200 text-4xl">🏪</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Agenda Diikuti</p>
                    <h3 className="text-3xl font-bold text-orange-600">{joinedAgenda}</h3>
                </div>
                <div className="text-orange-200 text-4xl">📅</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Donasi Tersalurkan</p>
                    <h3 className="text-3xl font-bold text-green-600">{totalDonation}</h3>
                </div>
                <div className="text-green-200 text-4xl">💰</div>
            </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Selamat Datang, {session.user?.name || (session.user as any).username}!</h3>
            <p className="text-blue-600 mb-2">
                Terima kasih telah bergabung di IKA SMANDA KENDAL. 😊
            </p>
            <p className="text-blue-600 text-sm">
                Di sini Anda dapat mengelola profil, berkontribusi dengan menulis artikel, memasarkan usaha Anda di Lapak Alumni, 
                serta mengikuti agenda kegiatan dan berdonasi untuk kemajuan almamater.
            </p>
        </div>
    </div>
  );
}
