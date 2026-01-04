import Link from "next/link";
import { Button } from "@/components/ui/Button";
import connectDB from "@/lib/db";
import LowonganKerja from "@/models/LowonganKerja";
import { 
    FaBriefcase, 
    FaBuilding, 
    FaSearch, 
    FaMapMarkerAlt, 
    FaFilter, 
    FaClock, 
    FaMoneyBillWave,
    FaArrowRight,
    FaCheckCircle,
    FaBookmark,
    FaShareAlt
} from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function InfoLokerPage() {
  await connectDB();
  const jobs = await LowonganKerja.find({ status: 'active' }).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
        
        {/* 1. Jobstreet-style High-Impact Search Hero */}
        <div className="bg-[#1E40AF] pt-24 pb-32 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-40"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="max-w-3xl mb-12">
                    <h1 className="text-5xl md:text-7xl font-bold font-bebas tracking-tight mb-6 drop-shadow-xl text-white">
                        Wujudkan <span className="text-yellow-400 underline decoration-4 underline-offset-8">Karir Impian</span> Bersama Alumni
                    </h1>
                    <p className="text-blue-50 text-xl font-medium leading-relaxed opacity-90 drop-shadow-md">
                        Platform karir eksklusif IKASMANDA. Akses ribuan peluang dari jaringan perusahaan terpercaya milik alumni dan mitra nasional.
                    </p>
                </div>

                {/* Modern Floating Search Bar */}
                <div className="bg-white p-2 md:p-3 rounded-[32px] shadow-2xl flex flex-col md:flex-row gap-2 border-4 border-white/20 backdrop-blur-sm">
                    <div className="flex-1 relative flex items-center group">
                        <FaSearch className="absolute left-6 text-gray-400 transition-colors group-focus-within:text-blue-600" size={18}/>
                        <input type="text" placeholder="Posisi, Perusahaan, atau Skill..." className="w-full pl-16 pr-6 py-5 bg-gray-50/50 border-none rounded-[24px] text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none shadow-inner" />
                    </div>
                    <div className="w-px bg-gray-200 hidden md:block my-3"></div>
                    <div className="flex-1 relative flex items-center group">
                        <FaMapMarkerAlt className="absolute left-6 text-gray-400 transition-colors group-focus-within:text-blue-600" size={18}/>
                        <input type="text" placeholder="Kota atau WFH..." className="w-full pl-16 pr-6 py-5 bg-gray-50/50 border-none rounded-[24px] text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none shadow-inner" />
                    </div>
                    <Button className="bg-[#1E40AF] hover:bg-black text-white px-12 py-5 rounded-[24px] font-black text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center gap-3">
                        CARI PELUANG <FaArrowRight />
                    </Button>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="flex flex-col lg:flex-row gap-10 -mt-20">
                
                {/* 2. Advanced Sidebar Filters */}
                <div className="w-full lg:w-[320px] space-y-8">
                    <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl font-bebas tracking-widest uppercase">
                                <FaFilter className="text-blue-600" size={16}/> Filter Pencarian
                            </h3>
                            <button className="text-[10px] text-blue-600 font-black hover:underline uppercase tracking-widest">Reset</button>
                        </div>
                        
                        <div className="h-px bg-gray-50"></div>

                        {/* Special Filter: Alumni Network */}
                        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                             <label className="flex items-center gap-4 cursor-pointer">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer appearance-none w-7 h-7 bg-white border-2 border-blue-200 rounded-xl checked:bg-blue-600 checked:border-blue-600 transition-all"/>
                                    <FaCheckCircle className="absolute inset-x-0 mx-auto text-white scale-0 peer-checked:scale-100 transition-transform" size={14}/>
                                </div>
                                <div>
                                    <span className="block text-sm font-black text-blue-900 uppercase tracking-tighter">Network Alumni</span>
                                    <span className="block text-[10px] text-blue-600/70 font-bold leading-none mt-1">Hanya dari perusahaan alumni</span>
                                </div>
                             </label>
                        </div>

                        {/* Job Type */}
                        <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Tipe Pekerjaan</h4>
                            <div className="space-y-4">
                                {['Full Time', 'Contract', 'WFH / Remote', 'Internship'].map((type) => (
                                    <label key={type} className="group flex items-center gap-4 text-sm font-bold text-gray-600 cursor-pointer hover:text-blue-900 transition-colors">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer appearance-none w-6 h-6 border-2 border-gray-100 rounded-xl checked:bg-blue-600 checked:border-blue-600 transition-all"/>
                                            <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">✓</div>
                                        </div>
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Salary Range */}
                        <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Range Gaji</h4>
                            <div className="space-y-4">
                                {['< 5 Juta', '5 - 10 Juta', '10 - 20 Juta', '> 20 Juta'].map((range) => (
                                    <label key={range} className="group flex items-center gap-4 text-sm font-bold text-gray-600 cursor-pointer hover:text-blue-900 transition-colors">
                                        <div className="relative flex items-center">
                                            <input type="radio" name="salary" className="peer appearance-none w-6 h-6 border-2 border-gray-100 rounded-full checked:border-blue-600 transition-all"/>
                                            <div className="absolute inset-0 flex items-center justify-center text-blue-600 scale-0 peer-checked:scale-100 transition-transform">•</div>
                                        </div>
                                        {range}
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <Button className="w-full bg-black hover:bg-gray-800 text-white font-black rounded-2xl py-5 shadow-xl text-[10px] tracking-widest uppercase mt-4">
                            TERAPKAN FILTER
                        </Button>
                    </div>

                    {/* Premium Career Subscription */}
                    <div className="bg-yellow-400 p-10 rounded-[40px] shadow-2xl text-blue-900 relative overflow-hidden group">
                         <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                         <h3 className="text-2xl font-bold font-bebas mb-6 tracking-wide flex items-center gap-3"><FaClock/> Career Alerts!</h3>
                         <p className="text-blue-900/70 text-sm font-bold leading-relaxed mb-8">Jadilah yang pertama tahu saat ada peluang karir dari network alumni top.</p>
                         <div className="space-y-3">
                            <input type="email" placeholder="Email Aktif Anda" className="w-full px-6 py-4 rounded-2xl text-sm font-bold bg-white/40 border-none placeholder:text-blue-900/30 outline-none focus:bg-white/60 transition-all shadow-inner" />
                            <Button className="w-full bg-blue-900 text-white hover:bg-black font-black rounded-2xl py-4 shadow-xl text-[10px] tracking-widest uppercase">AKTIFKAN ALERTS</Button>
                         </div>
                    </div>
                </div>

                {/* 3. Main Job Listings Grid */}
                <div className="flex-1 pt-24 lg:pt-28">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 pb-6 border-b border-gray-200">
                        <div className="flex-1">
                            <h2 className="text-4xl font-bold font-bebas text-gray-900 tracking-wider">Peluang Karir <span className="text-blue-600">Alumni</span></h2>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {jobs.length} Lowongan Sesuai Kriteria Anda
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Urutkan:</span>
                            <select className="bg-white border-2 border-gray-100 rounded-xl px-4 py-2 text-xs font-black text-gray-900 outline-none focus:border-blue-600 cursor-pointer shadow-sm">
                                <option>TERBARU</option>
                                <option>GAJI TERTINGGI</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {jobs.map((job) => (
                            <div key={job._id.toString()} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-50 transition-all duration-500 group relative">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Company Logo / Visual */}
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[32px] flex items-center justify-center text-blue-600 text-3xl shrink-0 group-hover:scale-105 transition-transform shadow-inner border border-blue-50">
                                        <FaBuilding />
                                    </div>
                                    
                                    <div className="flex-1 w-full">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                            <div>
                                                <h3 className="font-bold text-3xl text-gray-900 group-hover:text-blue-600 transition-colors mb-2 font-bebas tracking-wide">{job.judul}</h3>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-gray-400 font-black text-xs uppercase tracking-widest">{job.perusahaan}</span>
                                                    <span className="text-[10px] bg-blue-50 text-blue-600 font-black px-3 py-1 rounded-full uppercase">ALUMNI NETWORK</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-3 bg-gray-50 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"><FaBookmark size={18}/></button>
                                                <button className="p-3 bg-gray-50 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"><FaShareAlt size={18}/></button>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-bold text-gray-500 mb-8 border-b border-gray-50 pb-8 mt-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600"><FaMapMarkerAlt size={14}/></div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-300 uppercase font-black">LOKASI</span>
                                                    {job.lokasi}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600"><FaMoneyBillWave size={14}/></div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-300 uppercase font-black">ESTIMASI GAJI</span>
                                                    {job.gaji_min?.toLocaleString('id-ID')} - {job.gaji_max?.toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600"><FaBriefcase size={14}/></div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-300 uppercase font-black">TIPE</span>
                                                    {job.tipe_pekerjaan}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                            <div className="flex flex-wrap gap-2">
                                                {['Next.js', 'Typescript', 'Hybrid'].map(tag => (
                                                    <span key={tag} className="px-5 py-2 bg-gray-50 text-gray-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-gray-100 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">{tag}</span>
                                                ))}
                                            </div>
                                            <Link href={`/info-loker/id`} className="w-full sm:w-auto">
                                                <Button className="bg-blue-600 hover:bg-black text-white font-black px-12 py-5 rounded-2xl text-[10px] tracking-widest uppercase shadow-xl transition-all group-hover:px-16 active:scale-95 group-hover:scale-105">
                                                    DETAIL KERJA <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform"/>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

        {/* 4. Dynamic "Featured Partners" Grid */}
        <div className="bg-white py-32 border-t-2 border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                 <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest mb-10 border border-blue-100">
                    Trusted Path Partners
                 </div>
                 <h2 className="text-6xl font-black font-bebas text-gray-900 mb-16 tracking-tighter">Perusahaan <span className="text-blue-600">Partner Alumni</span></h2>
                 <div className="flex flex-wrap justify-center items-center gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
                     {['TECHALUMNI', 'NEXGEN', 'VORTEX', 'SYNAPSE', 'CORE'].map((name) => (
                         <div key={name} className="flex flex-col items-center gap-2 group cursor-pointer">
                             <div className="w-20 h-20 rounded-full border-4 border-gray-200 flex items-center justify-center group-hover:border-blue-600 transition-all">
                                <FaBuilding size={32} />
                             </div>
                             <span className="font-black text-xs tracking-[0.3em] font-roboto group-hover:text-blue-600">{name}</span>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    </div>
  );
}

