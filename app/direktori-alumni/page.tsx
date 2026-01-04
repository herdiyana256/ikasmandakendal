import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
    FaUserGraduate, 
    FaSearch, 
    FaMapMarkedAlt, 
    FaList, 
    FaFilter, 
    FaMapMarkerAlt, 
    FaHistory,
    FaBriefcase 
} from "react-icons/fa";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DirektoriAlumniPage() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
      redirect("/masuk");
  }

  // Fetch alumni
  const alumni = await User.find({ role: 'alumni' }).select('-password').sort({ angkatan: -1 }).limit(50);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* 1. Hero Section */}
      <div className="bg-[#1E40AF] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold font-bebas mb-6 leading-tight drop-shadow-lg text-white">
              Direktori & Peta Alumni
            </h1>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed max-w-2xl">
              Cari dan jalin kembali komunikasi dengan rekan sejawat SMA Negeri 1 Kendal. 
              Temukan mereka yang tersebar di berbagai belahan dunia.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                  <span className="text-yellow-400 font-bold text-2xl block">{alumni.length}+</span>
                  <span className="text-white text-xs uppercase tracking-wider font-bold">Alumni Terdata</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                  <span className="text-yellow-400 font-bold text-2xl block">34+</span>
                  <span className="text-white text-xs uppercase tracking-wider font-bold">Kota Domisili</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* 2. Search & Filter Bar */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-12 border border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                       <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                          type="text" 
                          placeholder="Cari Nama Alumni..." 
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1E40AF] outline-none transition-all"
                       />
                  </div>
                  <div className="relative">
                       <FaHistory className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <select className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl appearance-none outline-none focus:ring-2 focus:ring-[#1E40AF]">
                            <option>Semua Angkatan</option>
                            <option>2020 - 2025</option>
                            <option>2010 - 2019</option>
                            <option>2000 - 2009</option>
                            <option>Lulus Sebelum 2000</option>
                       </select>
                  </div>
                  <div className="relative">
                       <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                       <select className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl appearance-none outline-none focus:ring-2 focus:ring-[#1E40AF]">
                            <option>Semua Kota</option>
                            <option>Kendal</option>
                            <option>Semarang</option>
                            <option>Jakarta</option>
                            <option>Luar Negeri</option>
                       </select>
                  </div>
                  <div className="flex gap-2">
                       <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-2xl py-3 shadow-lg">
                          Terapkan Filter
                       </Button>
                       <Button variant="outline" className="rounded-2xl border-gray-200 p-3 hover:bg-gray-50">
                          <FaFilter className="text-gray-600" />
                       </Button>
                  </div>
             </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* 3. List View Content */}
            <div className="flex-1 space-y-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-bebas text-gray-900 tracking-wide flex items-center gap-3">
                        <FaList className="text-[#1E40AF]" /> Daftar Alumni
                    </h2>
                    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                         <button className="px-4 py-2 bg-blue-50 text-[#1E40AF] rounded-lg text-sm font-bold flex items-center gap-2">
                            <FaList /> List
                         </button>
                         <button className="px-4 py-2 text-gray-400 hover:text-gray-600 rounded-lg text-sm font-bold flex items-center gap-2">
                            <FaMapMarkedAlt /> Map
                         </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alumni.map((alum) => (
                        <Card key={alum._id.toString()} className="group hover:shadow-2xl transition-all duration-300 border-none bg-white rounded-3xl overflow-hidden shadow-sm">
                            <div className="h-24 bg-gradient-to-r from-[#1E40AF] to-blue-400"></div>
                            <div className="px-6 pb-6 text-center -mt-12">
                                <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-4 p-1 shadow-lg relative">
                                    <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                                        {(alum as any).foto_profil ? (
                                            <img src={(alum as any).foto_profil} alt={alum.nama_depan} className="w-full h-full object-cover" />
                                        ) : (
                                            <FaUserGraduate className="text-3xl text-gray-300" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-sm" title="Aktif"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#1E40AF] transition-colors line-clamp-1">
                                    {alum.nama_depan} {alum.nama_belakang}
                                </h3>
                                <div className="inline-block bg-blue-50 text-[#1E40AF] text-xs font-bold px-3 py-1 rounded-full mb-4">
                                    Angkatan {alum.angkatan || 'N/A'}
                                </div>
                                
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <FaMapMarkerAlt className="text-red-400 shrink-0" />
                                        <span>{alum.kota || 'Kendal'}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <FaBriefcase className="text-blue-400 shrink-0" />
                                        <span className="line-clamp-1">{alum.status_pekerjaan || 'Pekerjaan belum diisi'}</span>
                                    </div>
                                </div>

                                <Link href={`/alumni/${alum._id}`}>
                                    <Button className="w-full bg-gray-50 hover:bg-[#1E40AF] text-gray-700 hover:text-white border-none rounded-2xl font-bold py-3 transition-all duration-300 shadow-sm">
                                        Lihat Profil
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>

                {alumni.length === 0 && (
                     <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-300 text-center">
                         <FaUserGraduate className="mx-auto text-6xl text-gray-200 mb-6" />
                         <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada alumni terdaftar</h3>
                         <p className="text-gray-500">Data alumni akan muncul setelah pendaftaran diverifikasi.</p>
                     </div>
                )}
            </div>

            {/* 4. Sidebar Stats */}
            <div className="w-full lg:w-80 space-y-8">
                
                {/* Statistics Card */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                         Statistik Wilayah
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Kendal", count: "1,240", color: "#1E40AF" },
                            { label: "Semarang", count: "850", color: "#3B82F6" },
                            { label: "Jakarta", count: "520", color: "#60A5FA" },
                            { label: "Luar Negeri", count: "45", color: "#93C5FD" }
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-sm font-bold">
                                    <span>{stat.label}</span>
                                    <span className="text-[#1E40AF]">{stat.count}</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                     <div className="h-full rounded-full" style={{ width: `${Math.random() * 60 + 20}%`, backgroundColor: stat.color }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Registration CTA */}
                <div className="bg-gradient-to-br from-blue-900 to-[#1E40AF] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                         <FaUserGraduate size={150} />
                    </div>
                    <div className="relative z-10 text-center">
                        <h3 className="font-bold text-2xl mb-4 leading-tight">Belum Terdaftar?</h3>
                        <p className="text-blue-100 text-sm mb-6">Update lokasi & profil Anda agar rekan sejawat bisa menemukan Anda.</p>
                        <Link href="/alumni/profile">
                            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-2xl py-3">
                                Update Lokasi Saya
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
}
