import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FaHandHoldingHeart, FaCreditCard, FaQrcode, FaWhatsapp, FaUniversity, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import connectDB from "@/lib/db";
import Donasi from "@/models/Donasi";

export const dynamic = 'force-dynamic';

export default async function DonasiPage() {
  await connectDB();
  
  // Fetch active campaigns
  const campaigns = await Donasi.find({ status: 'active' }).sort({ created_at: -1 });
  
  // Get featured campaign (first one or specific flag if we had it)
  const featured = campaigns.length > 0 ? campaigns[0] : null;
  const others = campaigns.length > 1 ? campaigns.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
        {/* 1. Hero Campaign Section */}
        <div className="bg-[#1E40AF] text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/40 to-transparent z-10"></div>
                <img src="/donasi-campaign.jpg" alt="Donasi Campaign" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center gap-16">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="inline-block bg-yellow-400 text-blue-900 font-black px-5 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] mb-6 shadow-xl animate-bounce">
                        Program Unggulan
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-bebas mb-6 leading-tight text-white drop-shadow-2xl">
                        {featured ? featured.nama_campaign : "Alumni Peduli, IKASMANDA Hebat"}
                    </h1>
                    <p className="text-blue-50 text-xl mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-lg opacity-90">
                        {featured ? featured.deskripsi : "Mari bantu alumni dan masyarakat yang membutuhkan melalui program donasi resmi."}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Button className="bg-white text-[#1E40AF] hover:bg-yellow-400 hover:!text-[#1E40AF] active:!text-[#1E40AF] font-black px-10 py-4 rounded-full text-lg shadow-2xl transition-all transform hover:scale-110">
                            Donasi Sekarang
                        </Button>
                        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-bold backdrop-blur-md">
                            Lihat Laporan Keuangan
                        </Button>
                    </div>
                </div>

                {/* Right Progress Card */}
                {featured && (
                    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 shadow-2xl transform hover:rotate-2 transition-all duration-500">
                        <div className="mb-8">
                             <div className="flex justify-between items-end mb-4">
                                 <div>
                                     <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Dana Terkumpul</p>
                                     <h3 className="text-3xl font-black text-yellow-400">Rp {featured.current_amount?.toLocaleString() || 0}</h3>
                                 </div>
                                 <div className="text-right">
                                     <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Target</p>
                                     <h3 className="text-xl font-bold text-white/80">Rp {featured.target_amount?.toLocaleString() || 0}</h3>
                                 </div>
                             </div>
                             <div className="w-full bg-black/20 h-5 rounded-full p-1 border border-white/10 shadow-inner">
                                  <div 
                                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full rounded-full transition-all duration-[2s] ease-out shadow-lg relative" 
                                    style={{ width: `${Math.min(((featured.current_amount || 0) / (featured.target_amount || 1)) * 100, 100)}%` }}
                                  >
                                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                  </div>
                             </div>
                             <div className="mt-4 flex justify-between items-center">
                                 <span className="bg-blue-900/50 px-3 py-1 rounded-lg text-xs font-black text-blue-200">
                                     {Math.round(((featured.current_amount || 0) / (featured.target_amount || 1)) * 100)}% TERPENUHI
                                 </span>
                                 <span className="text-xs font-bold text-white/60 italic">342 Donatur Terlibat</span>
                             </div>
                        </div>
                        <div className="pt-6 border-t border-white/10 flex items-center gap-4 text-sm text-blue-100 font-medium">
                            <FaInfoCircle className="text-yellow-400 shrink-0" />
                            <p>“Dana ini digunakan sepenuhnya untuk beasiswa siswa berprestasi SMANDA.”</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
            
            {/* 2. Transparansi & Pengelolaan */}
            <section className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                         <div className="absolute -inset-4 bg-blue-100 rounded-[50px] transform rotate-3 group-hover:rotate-0 transition-all duration-700"></div>
                         <img 
                            src="/reuni-akbar.jpg" 
                            alt="Transparansi" 
                            className="relative rounded-[40px] shadow-2xl object-cover h-[500px] w-full"
                         />
                         <div className="absolute -bottom-8 -right-8 bg-yellow-400 p-8 rounded-[30px] shadow-xl max-w-xs border-4 border-white">
                             <p className="text-[#1E40AF] font-black text-2xl mb-2 font-bebas">100% Diawasi</p>
                             <p className="text-blue-900 text-sm font-bold">Dana dikelola secara profesional dan transparan.</p>
                         </div>
                    </div>
                    <div className="space-y-8">
                        <div className="inline-block bg-blue-50 text-[#1E40AF] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Official Governance
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-bebas text-gray-900 tracking-wide leading-tight">
                            Transparansi & Pengelolaan Dana Alumni
                        </h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                    <FaCheckCircle size={24} />
                                </div>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    Semua dana disalurkan melalui <strong>rekening resmi IKA SMANDA KENDAL</strong> dan diawasi ketat oleh bendahara alumni serta auditor independen internal.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-blue-100 text-[#1E40AF] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                    <FaInfoCircle size={24} />
                                </div>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    Laporan donasi dipublikasikan secara berkala (bulanan & triwulan) untuk menunjukkan jumlah dana terkumpul dibandingkan dengan pengunaannya di lapangan.
                                </p>
                            </div>
                        </div>
                        <Button className="bg-[#1E40AF] hover:bg-black text-white font-black px-10 py-4 rounded-2xl shadow-xl uppercase tracking-widest text-sm">
                            Unduh Laporan Terbaru
                        </Button>
                    </div>
                </div>
            </section>

            {/* 3. Dampak Nyata */}
            <section className="bg-gray-900 rounded-[60px] p-16 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>
                <div className="relative z-10 text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold font-bebas mb-4 tracking-wider">Dampak Nyata Donasi Anda</h2>
                    <p className="text-blue-200 font-medium text-lg">Setiap kontribusi Anda memberikan perubahan besar bagi almamater.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                     <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-md shadow-2xl hover:bg-white/10 transition-all group">
                         <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">🎓</div>
                         <h3 className="text-2xl font-bold mb-4 font-bebas tracking-wide text-yellow-400">Pendidikan Unggul</h3>
                         <p className="text-blue-100/80 leading-relaxed text-lg font-medium">
                             “Setiap <strong>Rp 1 Juta</strong> yang didonasikan akan membantu <strong>2 siswa</strong> mendapatkan buku, perlengkapan sekolah, dan subsidi biaya pendidikan selama satu semester.”
                         </p>
                     </div>
                     <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-md shadow-2xl hover:bg-white/10 transition-all group">
                         <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">🤝</div>
                         <h3 className="text-2xl font-bold mb-4 font-bebas tracking-wide text-yellow-400">Sosial & Komunitas</h3>
                         <p className="text-blue-100/80 leading-relaxed text-lg font-medium">
                             “Kontribusi rutin Anda akan mendukung <strong>1 kegiatan sosial</strong> besar di komunitas alumni dan masyarakat Kendal setiap bulannya.”
                         </p>
                     </div>
                </div>
            </section>

            {/* 4. Program Pilihan */}
            <section>
                 <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                      <div className="max-w-xl">
                          <h2 className="text-4xl md:text-5xl font-bold font-bebas text-gray-900 tracking-wide mb-2 uppercase">Target Donasi Lainnya</h2>
                          <div className="w-24 h-1.5 bg-[#1E40AF] rounded-full"></div>
                      </div>
                      <Link href="/donasi/semua" className="text-[#1E40AF] font-black text-sm uppercase tracking-widest hover:text-yellow-500 transition-colors">Semua Program &rarr;</Link>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                     {others.length > 0 ? others.map((item) => (
                         <div key={item._id.toString()} className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full transform hover:-translate-y-2">
                             <div className="h-64 bg-gray-200 w-full relative overflow-hidden">
                                 <img src={item.gambar_url || "/peduli-pendidikan.jpg"} alt={item.nama_campaign} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                 <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] px-4 py-1.5 font-black rounded-full uppercase tracking-tighter shadow-lg">Mendesak</div>
                             </div>
                             <div className="p-10 flex-1 flex flex-col">
                                 <h3 className="font-bold text-2xl mb-4 text-gray-900 leading-tight group-hover:text-[#1E40AF] transition-colors">{item.nama_campaign}</h3>
                                 <p className="text-gray-500 text-sm line-clamp-3 mb-8 flex-1 font-medium leading-relaxed">{item.deskripsi}</p>
                                 
                                 <div className="mt-auto space-y-4">
                                     <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden shadow-inner font-inter">
                                         <div className="bg-gradient-to-r from-[#1E40AF] to-blue-400 h-full rounded-full" style={{ width: `${Math.min(((item.current_amount || 0) / (item.target_amount || 1)) * 100, 100)}%` }}></div>
                                     </div>
                                     <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                         <span className="text-gray-400">Terkumpul: <span className="text-gray-900">Rp {item.current_amount?.toLocaleString() || 0}</span></span>
                                         <span className="bg-blue-50 text-[#1E40AF] px-2 py-1 rounded-md">{Math.round(((item.current_amount || 0) / (item.target_amount || 1)) * 100)}%</span>
                                     </div>
                                     <Button className="w-full mt-6 bg-[#1E40AF] hover:bg-black text-white font-bold py-4 rounded-2xl shadow-lg transition-all group/btn">
                                         Pilih Donasi <span className="ml-2 group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                                     </Button>
                                 </div>
                             </div>
                         </div>
                     )) : (
                          <div className="col-span-3 text-center py-20 text-gray-400 bg-white rounded-[40px] border-2 border-dashed border-gray-200">
                              <p className="font-bold text-lg">Belum ada program donasi lainnya saat ini.</p>
                          </div>
                     )}
                 </div>
            </section>

            {/* 5. Bukti Kegiatan / Testimonial */}
            <section>
                 <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold font-bebas text-gray-900 tracking-wide mb-4 uppercase">Bukti Kegiatan & Dampak</h2>
                      <p className="text-gray-500 font-medium">Melihat kembali senyuman dan kemajuan yang kita ciptakan bersama.</p>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 group relative h-96 rounded-[40px] overflow-hidden shadow-xl">
                           <img src="/peduli-pendidikan.jpg" alt="Dampak Beasiswa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                           <div className="absolute bottom-0 left-0 p-8 text-white">
                                <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-2">Cerita Sukses</p>
                                <h4 className="text-3xl font-bold font-bebas mb-2 leading-tight">Mewujudkan Mimpi 50 Adik Kelas</h4>
                                <p className="text-sm opacity-80 font-medium">“Bulan lalu, 50 siswa mendapat beasiswa penuh berkat donasi alumni Angkatan 2005. Pendidikan mereka kini lebih terjamin.”</p>
                           </div>
                      </div>
                      <div className="bg-[#1E40AF] p-10 rounded-[40px] text-white flex flex-col justify-center shadow-xl">
                           <div className="text-4xl mb-6">📢</div>
                           <h4 className="text-3xl font-bold font-bebas mb-4 tracking-wide text-yellow-400">Update Terakhir</h4>
                           <p className="text-blue-100 font-medium leading-relaxed mb-6">
                               Program Donor Darah IKA SMANDA minggu lalu sukses mengumpulkan 120 kantong darah untuk RSUD Kendal. 
                           </p>
                           <Link href="/berita" className="text-white font-black text-xs uppercase tracking-[0.2em] border-b-2 border-yellow-400 inline-block w-max pb-1">Lihat Berita Kegiatan</Link>
                      </div>
                 </div>
            </section>

            {/* 6. FAQ Expanded */}
            <section className="bg-white p-16 rounded-[60px] shadow-sm border border-gray-100">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-bebas text-gray-900 mb-4 tracking-wide uppercase">Tanya Jawab (FAQ)</h2>
                    <p className="text-gray-500">Semua yang perlu Anda ketahui tentang berdonasi di IKASMANDA.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                     {[
                         { 
                             q: "Bagaimana memastikan dana sampai ke program yang dituju?", 
                             a: "Kami menggunakan dashboard real-time untuk memantau dana masuk. Audit keuangan dilakukan berkala dan dapat diakses oleh semua alumni yang terdaftar." 
                         },
                         { 
                             q: "Apakah donasi bisa rutin setiap bulan?", 
                             a: "Ya! Anda dapat mengaktifkan fitur 'Recurring Donation' melalui profil alumni Anda atau mengatur autodebet ke rekening resmi IKA SMANDA." 
                         },
                         { 
                             q: "Apakah bisa donasi dengan barang, bukan uang?", 
                             a: "Tentu. Untuk donasi logistik (buku, komputer, alat kesehatan), silakan hubungi tim sekretariat melalui WhatsApp Admin untuk koordinasi pengiriman." 
                         },
                         { 
                             q: "Siapa penanggung jawab pengelolaan dana ini?", 
                             a: "Dana dikelola oleh Bendahara Umum Pengurus Pusat IKA SMANDA KENDAL dan diawasi oleh Dewan Pembina Alumni." 
                         }
                     ].map((item, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-gray-50 hover:bg-blue-50 transition-colors border border-gray-100 group">
                            <h4 className="font-bold text-gray-900 mb-3 group-hover:text-[#1E40AF] transition-colors flex items-start gap-3">
                                <span className="text-[#1E40AF] font-black opacity-20 text-3xl leading-none">?</span>
                                {item.q}
                            </h4>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium pl-6">{item.a}</p>
                        </div>
                     ))}
                </div>
            </section>

            {/* 7. Call Transfer */}
            <section className="bg-yellow-400 rounded-[60px] p-16 text-blue-900 text-center relative overflow-hidden group shadow-2xl">
                 <div className="absolute -top-12 -left-12 text-[200px] opacity-10 font-bebas select-none group-hover:scale-110 transition-transform">ID</div>
                 <h2 className="text-4xl md:text-6xl font-black font-bebas mb-6 tracking-wider relative z-10 leading-none">Bantu Sekarang, Berdampak Selamanya</h2>
                 <p className="text-blue-900/70 text-lg mb-12 font-bold max-w-2xl mx-auto relative z-10 uppercase tracking-widest">Dana disalurkan melalui rekening resmi IKA SMANDA KENDAL</p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12 relative z-10">
                      {['BCA', 'BNI', 'Mandiri', 'BRI'].map((bank, idx) => (
                          <div key={idx} className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 hover:bg-white transition-all shadow-xl group/card">
                               <p className="font-black text-2xl mb-1 tracking-tighter group-hover/card:text-[#1E40AF]">{bank}</p>
                               <p className="text-[10px] font-black text-blue-900/40 uppercase mb-3">123-456-7890</p>
                               <Button className="text-[10px] bg-blue-900 text-white font-black px-4 py-1.5 rounded-full hover:bg-black uppercase tracking-widest">Salin No. Rek</Button>
                          </div>
                      ))}
                 </div>
                 
                 <Link href="https://wa.me/6281234567890" className="relative z-10 inline-flex items-center gap-4 bg-blue-900 text-white font-black px-12 py-5 rounded-full text-xl shadow-2xl hover:bg-black transition-all transform hover:scale-105 uppercase tracking-widest">
                     <FaWhatsapp size={28} /> Konfirmasi Transfer
                 </Link>
            </section>

        </div>

    </div>
  );
}
