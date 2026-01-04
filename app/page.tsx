import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import LapakAlumni from "@/models/LapakAlumni";
import Agenda from "@/models/Agenda";
import Donasi from "@/models/Donasi";
import LowonganKerja from "@/models/LowonganKerja";
import { FaCalendarAlt, FaStore, FaNewspaper, FaHandHoldingHeart, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import HeroCarousel from "@/components/HeroCarousel";

export const dynamic = 'force-dynamic';

function SectionHeader({ title, icon, link, linkText }: { title: string, icon:any, link: string, linkText: string }) {
    return (
        <div className="flex justify-between items-end mb-8 border-b-2 border-gray-100 pb-4">
             <div className="flex items-center gap-3">
                 <div className="p-3 bg-blue-50 rounded-lg text-[#1E40AF]">
                     {icon}
                 </div>
                 <h2 className="text-3xl font-bold text-gray-800 font-bebas tracking-wide">{title}</h2>
             </div>
             <Link href={link} className="text-[#1E40AF] font-bold hover:underline text-sm uppercase tracking-wider">
                 {linkText} &rarr;
             </Link>
        </div>
    )
}



export default async function Home() {
  await connectDB();

  // Fetch Data (Limit 4 for each as requested)
  const berita = await Berita.find({ status: 'approved', kategori: { $ne: 'Kolom Alumni' } }).sort({ published_at: -1 }).limit(4);
  const kolomAlumni = await Berita.find({ status: 'approved', kategori: 'Kolom Alumni' }).sort({ published_at: -1 }).limit(4); // Or user Tags
  const lapak = await LapakAlumni.find({ status: 'approved' }).sort({ created_at: -1 }).limit(4);
  const agenda = await Agenda.find({}).sort({ tanggal_mulai: 1 }).limit(4);
  const loker = await LowonganKerja.find({ status: 'active' }).sort({ created_at: -1 }).limit(4);
  const donasi = await Donasi.find({ status: 'active' }).sort({ created_at: -1 }).limit(4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeroCarousel />

      {/* BERITA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full">
          <SectionHeader title="Berita Terbaru" icon={<FaNewspaper size={24}/>} link="/berita" linkText="Lihat Semua Berita" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {berita.map((item) => (
                  <Card key={item._id.toString()} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col group overflow-hidden">
                      <div className="h-48 bg-gray-200 w-full relative overflow-hidden">
                          {item.gambar_url ? (
                              <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <FaNewspaper size={40} />
                              </div>
                          )}
                          <div className="absolute top-4 left-4 bg-[#1E40AF] text-white text-xs px-2 py-1 uppercase font-bold shadow-sm">{item.kategori}</div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                          <p className="text-xs text-gray-500 mb-2">{new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          <h3 className="text-xl font-bold font-bebas text-gray-900 mb-3 leading-tight line-clamp-2 hover:text-[#1E40AF]">
                              <Link href={`/berita/${item.slug}`}>{item.judul}</Link>
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{item.konten}</p>
                      </div>
                  </Card>
              ))}
          </div>
      </section>

      {/* HIGHLIGHT: FOKUS PROKER */}
      <section className="py-16 bg-[#F3F4F6]">
          {/* ... (Unchanged content) ... */}
          <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 space-y-6">
                      <span className="text-[#1E40AF] font-bold tracking-widest uppercase text-sm bg-blue-100 px-3 py-1 rounded-full">Program Unggulan</span>
                      <h2 className="text-4xl md:text-5xl font-bold font-bebas text-gray-900 leading-tight">Membangun Sinergi, Mengabdi Untuk Negeri</h2>
                      <p className="text-gray-600 text-lg leading-relaxed">
                          IKASMANDA KENDAL memiliki berbagai program kerja strategis yang berfokus pada pemberdayaan alumni, bantuan sosial, dan kontribusi nyata bagi kemajuan almamater SMA Negeri 1 Kendal.
                      </p>
                      <ul className="space-y-4">
                          <li className="flex items-center gap-3 text-gray-700 font-medium">
                              <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">✓</span>
                              Beasiswa Pendidikan Siswa Kurang Mampu
                          </li>
                          <li className="flex items-center gap-3 text-gray-700 font-medium">
                              <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">✓</span>
                              Pengembangan UMKM Alumni
                          </li>
                          <li className="flex items-center gap-3 text-gray-700 font-medium">
                              <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">✓</span>
                              Networking & Karir
                          </li>
                      </ul>
                      <Button className="bg-[#1E40AF] text-white hover:bg-[#112F82] px-8 py-3 rounded-full font-bold shadow-lg">Lihat Program Kerja</Button>
                  </div>
                  <div className="flex-1 w-full">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-4 mt-8">
                              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" alt="Proker 1" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                              <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" alt="Proker 2" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                          </div>
                          <div className="space-y-4">
                              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" alt="Proker 3" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                              <img src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop" alt="Proker 4" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* HIGHLIGHT: KELAS INSPIRASI */}
      <section className="py-20 relative overflow-hidden bg-white">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-50 -skew-x-12 transform translate-x-20"></div>
           <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
               <div className="text-center max-w-3xl mx-auto mb-16">
                   <h2 className="text-4xl font-bold font-bebas text-gray-900 mb-4">Kelas Inspirasi Alumni</h2>
                   <p className="text-gray-600 text-lg">Berbagi pengalaman dan ilmu praktis dari para alumni sukses kepada siswa-siswi SMA Negeri 1 Kendal.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                       { name: "Budi Santoso", role: "CEO Tech Startup", quote: "Gagal itu biasa, bangkit itu luar biasa. Teruslah berinovasi.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" },
                       { name: "Siti Rahmawati", role: "Dokter Spesialis", quote: "Pendidikan adalah senjata paling ampuh untuk mengubah dunia.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
                       { name: "Andi Pratama", role: "Arsitek Senior", quote: "Desain bukan hanya tentang bentuk, tapi tentang dampak bagi lingkungan.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" }
                   ].map((item, idx) => (
                       <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                           <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg ring-2 ring-blue-100">
                               <img src={`${item.img}?q=80&w=200&auto=format&fit=crop`} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                           <p className="text-[#1E40AF] font-bold text-sm mb-4 uppercase tracking-wider">{item.role}</p>
                           <p className="text-gray-500 italic">"{item.quote}"</p>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* KOLOM ALUMNI Section */}
      <section className="py-20 bg-gray-50"> 
          <div className="max-w-7xl mx-auto px-4 w-full">
            <SectionHeader title="Jejak Alumni" icon={<FaNewspaper size={24}/>} link="/kolom-alumni" linkText="Baca Tulisan Alumni" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {kolomAlumni.length > 0 ? kolomAlumni.map((item) => (
                    <Card key={item._id.toString()} className="border-none shadow-md hover:-translate-y-1 transition-transform h-full flex flex-col group overflow-hidden">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                             {item.gambar_url && <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />}
                        </div>
                        <div className="p-6">
                            <span className="text-[#1E40AF] text-xs font-bold uppercase tracking-widest">{item.kategori}</span>
                            <h3 className="text-2xl font-bold font-bebas text-gray-900 mt-2 mb-3 leading-none">
                                <Link href={`/berita/${item.slug}`}>{item.judul}</Link>
                            </h3>
                            <div className="w-10 h-1 bg-gray-200 mb-4"></div>
                            <p className="text-gray-600 text-sm line-clamp-4 italic">"{item.konten.substring(0, 100)}..."</p>
                        </div>
                    </Card>
                )) : (
                     <p className="col-span-4 text-center text-gray-500">Belum ada tulisan alumni.</p>
                )}
            </div>
          </div>
      </section>

      {/* LAPAK ALUMNI Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full">
          <SectionHeader title="Lapak Alumni" icon={<FaStore size={24}/>} link="/lapak-alumni" linkText="Jelajahi Lapak" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lapak.map((item) => (
                  <Card key={item._id.toString()} className="group cursor-pointer overflow-hidden border border-gray-100">
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                          {item.gambar_url ? (
                              <img src={item.gambar_url} alt={item.nama_usaha} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                  <FaStore className="text-4xl text-gray-300 group-hover:text-[#1E40AF] transition-colors" />
                              </div>
                          )}
                      </div>
                      <div className="p-4">
                          <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#1E40AF] transition-colors">{item.nama_usaha}</h4>
                          <p className="text-sm text-gray-500">{item.alamat || item.lokasi}</p>
                      </div>
                  </Card>
              ))}
          </div>
      </section>

       {/* AGENDA Section */}
       <section className="py-20 bg-[#1E40AF] text-white">
          <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="flex justify-between items-end mb-8 border-b-2 border-white/20 pb-4">
                 <div className="flex items-center gap-3">
                     <div className="p-3 bg-white/10 rounded-lg">
                         <FaCalendarAlt size={24}/>
                     </div>
                     <h2 className="text-3xl font-bold font-bebas tracking-wide">Kalender Kegiatan</h2>
                 </div>
                 <Link href="/agenda" className="text-white/80 hover:text-white font-bold hover:underline text-sm uppercase tracking-wider">
                     Lihat Kalender &rarr;
                 </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {agenda.length > 0 ? agenda.map((item) => (
                    <div key={item._id.toString()} className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-yellow-400 group hover:bg-white/20 transition-all cursor-pointer">
                        <div className="text-3xl font-bold font-bebas mb-1 text-yellow-400">{new Date(item.tanggal_mulai).getDate()}</div>
                        <div className="text-sm uppercase tracking-wider opacity-75 mb-4">{new Date(item.tanggal_mulai).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">{item.judul}</h3>
                        <p className="text-sm opacity-80 line-clamp-2">{item.deskripsi}</p>
                    </div>
                )) : (
                    <div className="col-span-4 text-center opacity-50">Belum ada agenda mendatang.</div>
                )}
            </div>
          </div>
       </section>
      
       {/* INFO LOKER Section */}
       <section className="py-20 max-w-7xl mx-auto px-4 w-full">
          <SectionHeader title="Info Lowongan Kerja" icon={<FaBriefcase size={24}/>} link="/info-loker" linkText="Cari Lowongan" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loker.map((item) => (
                  <Card key={item._id.toString()} className="flex p-6 items-center gap-6 hover:shadow-lg transition-shadow border border-gray-100 group">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#1E40AF] shrink-0 group-hover:bg-[#1E40AF] group-hover:text-white transition-all">
                          <FaBriefcase size={20} />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#1E40AF] transition-colors">{item.judul}</h3>
                          <p className="text-[#1E40AF] font-medium">{item.perusahaan}</p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                               <span className="flex items-center gap-1"><FaMapMarkerAlt size={10}/> {item.lokasi}</span>
                              <span>•</span>
                              <span className="font-bold text-gray-700">{item.tipe_pekerjaan}</span>
                          </div>
                      </div>
                  </Card>
              ))}
          </div>
       </section>

       {/* DONASI Section */}
       <section className="py-20 bg-gray-50">
           <div className="max-w-7xl mx-auto px-4 w-full">
               <SectionHeader title="Program Donasi" icon={<FaHandHoldingHeart size={24}/>} link="/donasi" linkText="Mari Berdonasi" />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {donasi.map((item) => (
                       <Card key={item._id.toString()} className="overflow-hidden group hover:shadow-xl transition-shadow border-none">
                           <div className="h-44 bg-gray-200 w-full overflow-hidden relative">
                                {item.gambar_url ? (
                                    <img src={item.gambar_url} alt={item.nama_campaign} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <FaHandHoldingHeart size={40} />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-blue-900 shadow-sm uppercase">Active</div>
                           </div>
                           <div className="p-6">
                               <h3 className="font-bold text-lg mb-4 line-clamp-2 h-14 group-hover:text-[#1E40AF] transition-colors">{item.nama_campaign}</h3>
                               <div className="w-full bg-gray-100 h-2 rounded-full mb-3 overflow-hidden">
                                   <div className="bg-[#1E40AF] h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(((item.current_amount || 0) / (item.target_amount || 1)) * 100, 100)}%` }}></div>
                               </div>
                               <div className="flex justify-between text-[11px] font-bold uppercase tracking-tighter">
                                   <div className="flex flex-col text-blue-700">
                                       <span className="opacity-60 text-[9px]">Terkumpul</span>
                                       <span>Rp {(item.current_amount || 0).toLocaleString()}</span>
                                   </div>
                                   <div className="flex flex-col text-right text-gray-500">
                                       <span className="opacity-60 text-[9px]">Target</span>
                                       <span>Rp {(item.target_amount || 0).toLocaleString()}</span>
                                   </div>
                               </div>
                           </div>
                       </Card>
                   ))}
               </div>
           </div>
       </section>

    </div>
  );
}
