import Link from "next/link";
import { Button } from "@/components/ui/Button";
import connectDB from "@/lib/db";
import Agenda from "@/models/Agenda";
import { 
    FaCalendarAlt, 
    FaMapMarkerAlt, 
    FaFilter, 
    FaClock, 
    FaTicketAlt, 
    FaShareAlt, 
    FaHistory, 
    FaChevronLeft, 
    FaChevronRight,
    FaArrowRight,
    FaStar
} from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function AgendaPage() {
  await connectDB();
  const agendas = await Agenda.find({}).sort({ tanggal_mulai: 1 });
  
  const now = new Date();
  const upcoming = agendas.filter(a => new Date(a.tanggal_mulai) >= now);
  const past = agendas.filter(a => new Date(a.tanggal_mulai) < now);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
        
        {/* 1. Dynamic Hero Section */}
        <div className="bg-[#1E40AF] text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-30"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-white/20 shadow-xl">
                    <FaStar className="text-yellow-400" /> Kalender Event Resmi
                </div>
                <h1 className="text-6xl md:text-8xl font-bold font-bebas mb-8 tracking-tight drop-shadow-2xl">
                    Agenda <span className="text-yellow-400">IKASMANDA</span>
                </h1>
                <p className="text-blue-50 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
                    Temukan kesempatan untuk berkoneksi, belajar, dan tumbuh bersama komunitas alumni SMAN 1 Kendal.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                     <Button className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 font-black px-12 py-7 rounded-2xl text-lg shadow-2xl flex items-center gap-3 transition-all hover:scale-105 group">
                        LIHAT AGENDA <FaArrowRight className="group-hover:translate-x-2 transition-transform"/>
                     </Button>
                     <Button variant="outline" className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 font-bold px-10 py-7 rounded-2xl border-2">
                        ARSIP KEGIATAN
                     </Button>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* 2. Main Feed: Upcoming Events */}
                <div className="flex-1">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b-2 border-gray-100 pb-8 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold font-bebas text-gray-900 tracking-wider">Agenda Mendatang</h2>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> {upcoming.length} Event Menanti Anda
                            </p>
                        </div>
                        
                        <div className="flex gap-3">
                             <Button size="sm" variant="outline" className="w-12 h-12 rounded-2xl border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 bg-white shadow-sm"><FaChevronLeft/></Button>
                             <Button size="sm" variant="outline" className="w-12 h-12 rounded-2xl border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 bg-white shadow-sm"><FaChevronRight/></Button>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {upcoming.length > 0 ? upcoming.map((item) => (
                            <div key={item._id.toString()} className="group bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-blue-50 flex flex-col md:flex-row overflow-hidden">
                                {/* Date visual */}
                                <div className="bg-gradient-to-br from-[#1E40AF] to-blue-800 text-white p-10 flex flex-col items-center justify-center min-w-[180px] text-center relative overflow-hidden shrink-0">
                                    <div className="relative z-10">
                                        <span className="text-7xl font-bold font-bebas leading-none block mb-2">{new Date(item.tanggal_mulai).getDate()}</span>
                                        <div className="h-1 w-12 bg-yellow-400 mx-auto rounded-full mb-3 shadow-lg"></div>
                                        <span className="text-lg uppercase font-black tracking-[0.2em]">{new Date(item.tanggal_mulai).toLocaleDateString('id-ID', { month: 'short' })}</span>
                                        <span className="text-sm opacity-60 block mt-2 font-bold tracking-widest">{new Date(item.tanggal_mulai).getFullYear()}</span>
                                    </div>
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <FaCalendarAlt size={100} />
                                    </div>
                                </div>
                                
                                <div className="p-10 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="inline-block bg-blue-50 text-[#1E40AF] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
                                                {item.kategori || 'Event Alumni'}
                                            </span>
                                            <h3 className="text-3xl font-bold text-gray-900 group-hover:text-[#1E40AF] transition-colors leading-tight font-bebas tracking-wide">{item.judul}</h3>
                                        </div>
                                        <div className="hidden sm:flex flex-col items-end gap-1">
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Status RSVP</span>
                                            <span className="text-green-500 font-bold text-sm">Terbuka</span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-gray-400 mb-8 pb-8 border-b border-gray-50">
                                         <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-[#1E40AF]"><FaClock size={12}/></div> 09:00 - Selesai</div>
                                         <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-[#1E40AF]"><FaMapMarkerAlt size={12}/></div> {item.lokasi}</div>
                                    </div>
                                    
                                    <p className="text-gray-500 font-medium leading-relaxed mb-10 line-clamp-2 md:line-clamp-3">{item.deskripsi}</p>
                                    
                                    <div className="mt-auto flex flex-wrap gap-4">
                                        <Button className="bg-blue-900 hover:bg-black text-white font-black px-10 py-4 rounded-2xl text-xs tracking-widest uppercase shadow-xl hover:scale-105 transition-all">
                                            Daftar Sekarang
                                        </Button>
                                        <Button variant="outline" className="border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 font-bold px-8 py-4 rounded-2xl text-xs tracking-widest uppercase flex items-center gap-2">
                                            <FaShareAlt size={12}/> Bagikan
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100 shadow-inner">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaCalendarAlt className="text-gray-200 text-4xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 font-bebas tracking-widest">Hening Sementara...</h3>
                                <p className="text-gray-400 max-w-xs mx-auto mt-2 font-medium">Belum ada agenda baru. Tetap pantau untuk update selanjutnya.</p>
                            </div>
                        )}
                    </div>

                    {/* 3. Past Events: Modern Grid */}
                    <div className="mt-28">
                         <div className="flex items-center gap-6 mb-12">
                             <h2 className="text-4xl font-bold font-bebas text-gray-400 tracking-wider shrink-0">Kegiatan Terlampaui</h2>
                             <div className="h-[2px] w-full bg-gray-100 rounded-full"></div>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {past.length > 0 ? past.map((item) => (
                                 <div key={item._id.toString()} className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-sm opacity-60 hover:opacity-100 transition-all duration-500 hover:shadow-xl group">
                                     <div className="flex justify-between items-center mb-6">
                                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{new Date(item.tanggal_mulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                         <div className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black rounded-full border border-gray-100">SELESAI</div>
                                     </div>
                                     <h3 className="font-bold text-2xl text-gray-900 mb-4 group-hover:text-blue-900 font-bebas tracking-wide transition-colors">{item.judul}</h3>
                                     <p className="text-xs text-gray-500 mb-8 font-medium leading-relaxed line-clamp-2">{item.deskripsi}</p>
                                     <Link href="#" className="flex items-center gap-3 text-blue-900 font-black text-[10px] tracking-widest uppercase hover:gap-4 transition-all">
                                         LIHAT DOKUMENTASI <FaArrowRight size={10} />
                                     </Link>
                                 </div>
                             )) : (
                                <p className="text-gray-400 italic font-medium">Arsip masih kosong.</p>
                             )}
                         </div>
                    </div>
                </div>

                {/* 4. Sidebar: Modern Widgets */}
                <div className="w-full lg:w-96 space-y-12">
                    
                    {/* Modern Calendar Widget */}
                    <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl font-bebas tracking-widest uppercase leading-none">
                                <FaCalendarAlt className="text-[#1E40AF]"/> {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                            </h3>
                            <div className="flex gap-1">
                                <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-300"><FaChevronLeft size={10}/></button>
                                <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-300"><FaChevronRight size={10}/></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-gray-300 mb-6 uppercase tracking-widest">
                            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                                <div key={d}>{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold text-gray-600">
                             {/* Mock Calendar Days (Focusing on current year/month for visual) */}
                             {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                                 <div key={d} className={`aspect-square flex items-center justify-center rounded-2xl transition-all ${d === 20 ? 'bg-[#1E40AF] text-white shadow-lg scale-110' : 'hover:bg-blue-50 hover:text-blue-900 cursor-pointer'}`}>
                                     {d}
                                 </div>
                             ))}
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] text-gray-400 font-black uppercase tracking-widest border-t border-gray-50 pt-8">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1E40AF]"></span> Event
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-100"></span> Kosong
                            </div>
                        </div>
                    </div>

                    {/* Advanced Filter Widget */}
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50">
                        <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-3 text-xl font-bebas tracking-widest uppercase leading-none">
                            <FaFilter className="text-[#1E40AF]"/> Filter Pencarian
                        </h3>
                        
                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Wilayah / Lokasi</label>
                                <div className="relative">
                                    <select className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#1E40AF] appearance-none cursor-pointer shadow-inner">
                                        <option>Semua Wilayah</option>
                                        <option>Online / Webinar</option>
                                        <option>Kendal</option>
                                        <option>Semarang</option>
                                        <option>Jakarta</option>
                                    </select>
                                    <FaChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 rotate-90" size={12}/>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Kategori Agenda</label>
                                <div className="space-y-3">
                                    {['Reuni', 'Workshop', 'Olahraga', 'Sosial'].map(cat => (
                                        <label key={cat} className="group flex items-center gap-4 text-sm font-bold text-gray-500 cursor-pointer hover:text-blue-900 transition-colors">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer appearance-none w-6 h-6 border-2 border-gray-100 rounded-xl checked:bg-blue-900 checked:border-blue-900 transition-all cursor-pointer shadow-sm"/>
                                                <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">✓</div>
                                            </div>
                                            {cat}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <Button className="w-full mt-10 bg-black hover:bg-gray-800 text-white font-black rounded-2xl py-5 shadow-xl text-[10px] tracking-widest uppercase">
                            TERAPKAN FILTER
                        </Button>
                    </div>

                    {/* Premium Newsletter CTA */}
                    <div className="bg-yellow-400 p-10 rounded-[40px] shadow-2xl text-blue-900 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <h3 className="text-2xl font-bold font-bebas mb-4 tracking-wide relative z-10 flex items-center gap-3"><FaTicketAlt/> Jangan Lewatkan!</h3>
                        <p className="text-blue-900/70 text-sm font-bold leading-relaxed mb-8 relative z-10">Dapatkan notifikasi undangan VVIP untuk setiap kegiatan alumni SMANDA.</p>
                        <div className="relative z-10 space-y-3">
                            <input type="email" placeholder="Email Anda" className="w-full px-6 py-4 rounded-2xl text-sm font-bold bg-white/40 border-none placeholder:text-blue-900/30 outline-none focus:bg-white/60 transition-all shadow-inner" />
                            <Button className="w-full bg-blue-900 text-white hover:bg-black font-black rounded-2xl py-4 shadow-xl text-[10px] tracking-widest uppercase">DAFTAR NEWSLETTER</Button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
  );
}
