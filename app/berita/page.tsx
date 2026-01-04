import Link from "next/link";
import { Button } from "@/components/ui/Button";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import { 
    FaNewspaper, 
    FaSearch, 
    FaFire, 
    FaChartLine, 
    FaShareAlt, 
    FaChevronRight, 
    FaGlobe,
    FaCalendarAlt 
} from "react-icons/fa";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function BeritaPage() {
  await connectDB();
  const allValues = await Berita.find({ status: 'approved' }).sort({ published_at: -1 });
  const berita = allValues.filter(b => b.kategori !== 'Kolom Alumni');
  
  // Hardcoded dummy if DB is empty to satisfy USER requirement
  const dummyBerita = [
      {
          _id: "dummy1",
          judul: "Persiapan Reuni Akbar Lintas Angkatan 2026 Dimulai",
          slug: "reuni-akbar-2026",
          konten: "SMAN 1 Kendal akan menjadi saksi sejarah berkumpulnya kembali ribuan alumni dari berbagai penjuru daerah. Panitia inti telah dibentuk...",
          gambar_url: "/uploaded_image_1_1767540104561.jpg",
          kategori: "Headline",
          published_at: new Date()
      },
      {
          _id: "dummy2",
          judul: "Alumni Angkatan 95 Berikan Donasi Renovasi Perpustakaan Sekolah",
          slug: "donasi-angkatan-95",
          konten: "Wujud bakti untuk almamater, angkatan 95 menyumbangkan dana untuk modernisasi sarana literasi di sekolah...",
          gambar_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
          kategori: "Kegiatan",
          published_at: new Date('2026-01-03')
      },
      {
          _id: "dummy3",
          judul: "Siswa SMAN 1 Kendal Borong Medali di OSN Tingkat Provinsi",
          slug: "prestasi-osn-2026",
          konten: "Kebanggaan bagi sekolah, perwakilan siswa berhasil menyapu bersih medali emas di bidang Fisika dan Astronomi...",
          gambar_url: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?q=80&w=2069&auto=format&fit=crop",
          kategori: "Prestasi",
          published_at: new Date('2026-01-02')
      }
  ];

  const featuredList = berita.length > 0 ? berita : dummyBerita;
  const featured = featuredList[0];
  const sideNews = featuredList.slice(1, 3);
  const feed = featuredList.slice(3).length > 0 ? featuredList.slice(3) : featuredList;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
         
         {/* 1. Breaking Ticker (Simple Style) */}
         <div className="bg-[#1E40AF] text-white overflow-hidden py-3 border-b-2 border-yellow-400 flex">
              <div 
                className="text-sm font-bold whitespace-nowrap animate-marquee-right flex gap-16"
                style={{ '--marquee-duration': '40s' } as React.CSSProperties}
              >
                   {/* Konten Utama */}
                   <span className="flex items-center gap-2">• <strong className="text-yellow-300">OPINI:</strong> Pentingnya Soft Skill di Era AI untuk Lulusan Baru.</span>
                   <span className="flex items-center gap-2">• <strong className="text-yellow-300">KENANGAN:</strong> Nostalgia Kantin Mbok Darmi dan Cerita di Baliknya.</span>
                   <span className="flex items-center gap-2">• <strong className="text-yellow-300">KUNJUNGAN:</strong> Alumni Angkatan 90 Kunjungi Almamater dalam Bakti Sosial.</span>
                   <span className="flex items-center gap-2">• <strong className="text-yellow-300">REUNI:</strong> Update terbaru persiapan Reuni Akbar IKA SMANDA 2026.</span>
                   
                   {/* Duplikasi untuk Seamless Loop */}
                   <span className="flex items-center gap-2">• <strong className="text-yellow-300">OPINI:</strong> Pentingnya Soft Skill di Era AI untuk Lulusan Baru.</span>
                   <span className="flex items-center gap-2">• <strong className="text-yellow-300">KENANGAN:</strong> Nostalgia Kantin Mbok Darmi dan Cerita di Baliknya.</span>
                   <span className="flex items-center gap-2">• <strong className="text-yellow-300">KUNJUNGAN:</strong> Alumni Angkatan 90 Kunjungi Almamater dalam Bakti Sosial.</span>
                   <span className="flex items-center gap-2">• <strong className="text-yellow-300">REUNI:</strong> Update terbaru persiapan Reuni Akbar IKA SMANDA 2026.</span>
              </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
             
             {/* 2. Headline Grid (Hero) */}
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
                  
                  {/* Big Featured */}
                  <div className="lg:col-span-8 group cursor-pointer">
                       <div className="relative h-[400px] md:h-[550px] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-blue-200">
                            <Image 
                                src={featured.gambar_url} 
                                alt={featured.judul}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                            <div className="absolute top-6 left-6 z-20">
                                 <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">HEADLINE UTAMA</span>
                            </div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full group">
                                 <h2 className="text-3xl md:text-5xl font-bold font-bebas text-white mb-4 leading-tight group-hover:text-yellow-400 transition-colors drop-shadow-lg">
                                      <Link href={`/berita/${featured.slug}`}>{featured.judul}</Link>
                                 </h2>
                                 <div className="flex items-center gap-6 text-white/80 text-sm font-bold">
                                      <span className="flex items-center gap-2"><FaCalendarAlt className="text-yellow-400"/> {new Date(featured.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                      <span className="flex items-center gap-2"><FaGlobe className="text-blue-400"/> IKA SMANDA KENDAL</span>
                                 </div>
                            </div>
                       </div>
                  </div>

                  {/* Side Small Featureds */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                       {sideNews.map((news) => (
                           <div key={news._id.toString()} className="flex-1 group cursor-pointer">
                                <div className="relative h-full min-h-[180px] rounded-[32px] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-blue-100">
                                     <Image 
                                         src={news.gambar_url} 
                                         alt={news.judul}
                                         fill
                                         className="object-cover transition-transform duration-700 group-hover:scale-110"
                                     />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                                     <div className="absolute bottom-0 left-0 p-6 z-20">
                                          <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-1 block">{news.kategori}</span>
                                          <h3 className="text-xl font-bold font-bebas text-white leading-tight group-hover:text-yellow-200 transition-colors">
                                               <Link href={`/berita/${news.slug}`}>{news.judul}</Link>
                                          </h3>
                                     </div>
                                </div>
                           </div>
                       ))}
                       {/* Optional Mini-CTA */}
                       <div className="bg-yellow-400 p-8 rounded-[32px] flex flex-col justify-center border border-yellow-500 shadow-xl relative overflow-hidden group">
                           <FaNewspaper className="absolute -bottom-6 -right-6 text-yellow-500 opacity-30 w-32 h-32 group-hover:scale-110 transition-transform" />
                           <h4 className="text-blue-900 font-black text-2xl mb-2 relative z-10">Update Terkini?</h4>
                           <p className="text-blue-800 text-sm mb-4 relative z-10 font-bold">Berlangganan buletin digital kami sekarang.</p>
                           <Button className="w-full bg-blue-900 text-white font-bold rounded-2xl hover:bg-black relative z-10">Daftar Newsletter</Button>
                       </div>
                  </div>
             </div>

             <div className="flex flex-col lg:flex-row gap-12">
                 
                 {/* 3. Main Feed Content */}
                 <div className="flex-1 space-y-12">
                     
                     <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-6">
                         <h2 className="text-3xl font-bold text-gray-900 font-bebas tracking-widest flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-[#1E40AF] rounded-full"></div> Kabar Terbaru
                         </h2>
                         <div className="relative hidden md:block w-72">
                              <input 
                                 type="text" 
                                 placeholder="Cari berita..." 
                                 className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1E40AF] outline-none shadow-sm"
                              />
                              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                         </div>
                     </div>

                     <div className="space-y-10">
                          {feed.map((item) => (
                              <div key={item._id.toString()} className="flex flex-col md:flex-row gap-8 group bg-white p-2 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-blue-50">
                                  <div className="w-full md:w-80 h-52 bg-gray-100 rounded-[28px] overflow-hidden shrink-0 relative shadow-inner">
                                        <Image 
                                            src={item.gambar_url} 
                                            alt={item.judul}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                        />
                                       <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 text-[10px] font-black text-[#1E40AF] rounded-full uppercase tracking-widest shadow-lg">
                                           {item.kategori}
                                       </div>
                                  </div>
                                  <div className="flex-1 flex flex-col pt-4 pr-6 pb-6 pl-2 md:pl-0">
                                       <div className="text-[10px] text-gray-400 mb-3 font-black uppercase tracking-widest flex items-center gap-2">
                                           <span>{new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span> • <span>GLOBAL UPDATE</span>
                                       </div>
                                       <h3 className="text-2xl font-bold font-bebas text-gray-900 mb-4 group-hover:text-[#1E40AF] transition-colors leading-snug tracking-wide">
                                           <Link href={`/berita/${item.slug}`}>{item.judul}</Link>
                                       </h3>
                                       <p className="text-gray-500 text-sm line-clamp-2 md:line-clamp-3 mb-6 font-medium leading-relaxed">{item.konten}</p>
                                       <div className="mt-auto flex justify-between items-center">
                                            <Link href={`/berita/${item.slug}`} className="text-[#1E40AF] font-black text-[11px] tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                                                 BACA SELENGKAPNYA <FaChevronRight size={10} />
                                            </Link>
                                            <button className="text-gray-300 hover:text-[#1E40AF] transition-colors"><FaShareAlt /></button>
                                       </div>
                                  </div>
                              </div>
                          ))}
                     </div>
                     
                     <div className="mt-16 text-center">
                         <Button className="px-16 py-4 rounded-[28px] bg-black hover:bg-gray-800 text-white font-black text-sm tracking-widest border border-gray-900 shadow-xl transition-all hover:scale-105 flex items-center gap-4 mx-auto uppercase">
                             Muat Berita Lainnya <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></div>
                         </Button>
                     </div>
                 </div>

                 {/* 4. Sidebar */}
                 <div className="w-full lg:w-96 space-y-10">
                     
                     {/* Trending List */}
                     <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl">
                         <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-3 text-xl font-bebas tracking-widest uppercase leading-none">
                            <FaChartLine className="text-[#1E40AF]"/> Paling Banyak Dibaca
                         </h3>
                         <div className="space-y-8">
                             {[1,2,3,4].map((i) => (
                                 <div key={i} className="flex gap-6 items-start group cursor-pointer">
                                     <span className="text-4xl font-black text-gray-100 group-hover:text-blue-100 transition-colors leading-none font-bebas">{i}</span>
                                     <div className="space-y-1">
                                         <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#1E40AF] transition-colors">
                                             Daftar Alumni Sukses Angkatan 2000 yang Jadi Inspirasi
                                         </h4>
                                         <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase">
                                              <span>PRESTASI</span> • <span>2 JAM LALU</span>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Newsletter Card */}
                     <div className="bg-[#1E40AF] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-110 transition-transform duration-1000"></div>
                          <div className="relative z-10">
                               <h3 className="text-2xl font-bold font-bebas mb-4 tracking-wide">Tetap Terhubung</h3>
                               <p className="text-blue-100 text-sm mb-8 font-medium">Dapatkan ringkasan berita alumni Kendal langsung di kotak masuk Anda setiap minggu.</p>
                               <div className="space-y-4">
                                    <input 
                                        type="email" 
                                        placeholder="Alamat Email Anda" 
                                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all font-bold text-sm shadow-inner"
                                    />
                                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black rounded-2xl py-4 shadow-xl text-sm tracking-widest uppercase">
                                        BERLANGGANAN
                                    </Button>
                               </div>
                          </div>
                     </div>
                     
                     {/* Social Grid */}
                     <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
                         <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-6">Ikuti Media Sosial Kami</h3>
                         <div className="grid grid-cols-4 gap-4">
                             {['FB', 'IG', 'YT', 'TW'].map(social => (
                                 <button key={social} className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-xs text-gray-400 hover:bg-[#1E40AF] hover:text-white transition-all duration-300 shadow-sm">
                                     {social}
                                 </button>
                             ))}
                         </div>
                     </div>

                 </div>
             </div>

         </div>
    </div>
  );
}
