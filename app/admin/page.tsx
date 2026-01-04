import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Berita from "@/models/Berita";
import Agenda from "@/models/Agenda";
import LapakAlumni from "@/models/LapakAlumni";
import Donasi from "@/models/Donasi";
import LowonganKerja from "@/models/LowonganKerja";
import { Card } from "@/components/ui/Card";
import { FaUsers, FaNewspaper, FaCalendarAlt, FaStore, FaHandHoldingHeart, FaBriefcase, FaUserShield } from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  await connectDB();

  // Fetch Stats in Parallel
  const [
    userCount, 
    beritaCount, 
    agendaCount, 
    lapakCount, 
    donasiCount, 
    lokerCount,
    adminCount
  ] = await Promise.all([
    User.countDocuments({ role: 'alumni' }),
    Berita.countDocuments({}),
    Agenda.countDocuments({}),
    LapakAlumni.countDocuments({}),
    Donasi.countDocuments({}),
    LowonganKerja.countDocuments({}),
    User.countDocuments({ role: { $in: ['admin', 'IT'] } })
  ]);

  const stats = [
    { label: 'Total Alumni', value: userCount, icon: FaUsers, color: 'bg-blue-500' },
    { label: 'Berita & Artikel', value: beritaCount, icon: FaNewspaper, color: 'bg-green-500' },
    { label: 'Agenda Kegiatan', value: agendaCount, icon: FaCalendarAlt, color: 'bg-purple-500' },
    { label: 'Lapak Alumni', value: lapakCount, icon: FaStore, color: 'bg-yellow-500' },
    { label: 'Program Donasi', value: donasiCount, icon: FaHandHoldingHeart, color: 'bg-red-500' },
    { label: 'Lowongan Kerja', value: lokerCount, icon: FaBriefcase, color: 'bg-indigo-500' },
    { label: 'Admin / Staff', value: adminCount, icon: FaUserShield, color: 'bg-gray-700' },
  ];

  return (
    <div>
       <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Selamat datang, <span className="font-bold text-blue-600">{session?.user?.name}</span> ({session?.user?.role === 'IT' ? 'Super Admin' : 'Administrator'})</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
             <Card key={idx} className="p-6 flex items-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                 <div className={`p-4 rounded-lg ${stat.color} text-white shadow-lg`}>
                     <stat.icon size={24} />
                 </div>
                 <div className="ml-4">
                     <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                     <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                 </div>
             </Card>
          ))}
       </div>

        {/* Quick Actions or Recent Activity could go here */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Aktivitas Terkini</h3>
                <div className="space-y-4">
                    <p className="text-sm text-gray-500 italic">Belum ada log aktivitas.</p>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Info System</h3>
                <div className="text-sm space-y-2">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Versi Sistem</span>
                        <span className="font-bold">v1.0.0 (Beta)</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Database</span>
                        <span className="font-bold text-green-600">Connected</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="text-gray-600">Server Time</span>
                        <span className="font-mono">{new Date().toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}
