import Link from "next/link";
import { Button } from "@/components/ui/Button";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import { 
    FaUser,
    FaClock, 
    FaFire, 
    FaPenNib, 
    FaSearch, 
    FaChevronRight,
    FaRegComment,
    FaRegHeart,
    FaList
} from "react-icons/fa";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function KolomAlumniPage() {
  await connectDB();
  const articles = await Berita.find({ status: 'approved', kategori: 'Kolom Alumni' }).sort({ published_at: -1 });
  
  // Categories and Tags
  const categories = [
      { name: "Karir & Bisnis", count: 12 },
      { name: "Pendidikan", count: 8 },
      { name: "Kesehatan", count: 5 },
      { name: "Seni & Budaya", count: 7 },
      { name: "Opini", count: 15 }
  ];

  const popularTags = ["#entrepreneur", "#beasiswa", "#kesehatanmental", "#nostalgia", "#teknologi", "#leadership"];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
       
       {/* 1. Hero Section */}
       <div className="bg-[#1E40AF] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-blue-900/60 z-10"></div>
            <Image 
                src="/entrance_smanda.jpg" 
                alt="Alumni Inspiring" 
                fill
                className="object-cover" 
            />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-bebas mb-6 leading-tight drop-shadow-xl text-white">
            Jejak Alumni Smanda
          </h1>
          <p className="text-blue-50 text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Kumpulan pemikiran, pengalaman, dan inspirasi dari para alumni IKA SMA Negeri 1 Kendal yang berdampak.
          </p>
          <div className="flex justify-center gap-4">
               <Link href="/masuk">
                   <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-10 py-4 rounded-full text-lg shadow-2xl flex items-center gap-2 transition-transform hover:scale-105">
                      <FaPenNib /> Mulai Menulis
                   </Button>
               </Link>
          </div>
        </div>
      </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
           
           <div className="flex flex-col lg:flex-row gap-12">
               
               {/* 2. Sidebar */}
               <div className="w-full lg:w-1/4 space-y-10 order-2 lg:order-1">
                   
                   {/* Search */}
                   <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Cari artikel..." 
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none shadow-inner"
                            />
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                   </div>

                   {/* Categories */}
                   <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                            <div className="w-1 h-6 bg-[#1E40AF] rounded"></div> Kategori
                        </h3>
                        <ul className="space-y-2">
                            {categories.map((cat, idx) => (
                                <li key={idx}>
                                    <Link href="#" className="flex justify-between items-center group hover:bg-blue-50 p-3 rounded-2xl transition-all duration-300">
                                        <span className="text-gray-600 group-hover:text-[#1E40AF] font-bold">{cat.name}</span>
                                        <span className="bg-gray-100 text-gray-400 text-xs px-2.5 py-1 rounded-full group-hover:bg-[#1E40AF] group-hover:text-white">{cat.count}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                   </div>

                   {/* Tags */}
                   <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                            <div className="w-1 h-6 bg-[#1E40AF] rounded"></div> Tag Populer
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {popularTags.map((tag, idx) => (
                                <Link key={idx} href="#" className="bg-gray-50 border border-gray-100 text-gray-600 text-xs px-4 py-2 rounded-xl hover:bg-[#1E40AF] hover:text-white hover:border-[#1E40AF] transition-all duration-300 font-bold">
                                    {tag}
                                </Link>
                            ))}
                        </div>
                   </div>
                   
                   {/* Community Perk/Stat */}
                   <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute -bottom-6 -right-6 opacity-10">
                            <FaPenNib className="w-32 h-32" />
                        </div>
                        <h4 className="text-yellow-400 font-black text-4xl mb-2">500+</h4>
                        <p className="text-blue-100 font-bold text-lg mb-4">Artikel Inspiratif</p>
                        <p className="text-gray-400 text-xs leading-relaxed">Bergabunglah dengan komunitas penulis alumni Smanda Kendal.</p>
                   </div>

               </div>

               {/* 3. Main Articles Area */}
               <div className="flex-1 order-1 lg:order-2">
                   
                   {/* Featured Article Card */}
                   {articles.length > 0 ? (
                       <div className="mb-16 group cursor-pointer">
                           <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-blue-200">
                               <Image 
                                   src={articles[0].gambar_url || "/entrance_smanda.jpg"} 
                                   alt={articles[0].judul} 
                                   fill
                                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                               <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                                   <div className="flex items-center gap-3 mb-4">
                                       <span className="bg-yellow-400 text-blue-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Editor&apos;s Choice</span>
                                       <span className="text-white/80 text-sm font-bold flex items-center gap-2"><FaClock size={12}/> {new Date(articles[0].published_at).toLocaleDateString('id-ID')}</span>
                                   </div>
                                   <h2 className="text-4xl md:text-5xl font-bold font-bebas text-white mb-4 leading-tight group-hover:text-yellow-400 transition-colors drop-shadow-md">
                                       {articles[0].judul}
                                   </h2>
                                   <p className="text-gray-200 text-lg mb-6 line-clamp-2 max-w-3xl font-medium drop-shadow-sm">
                                       {articles[0].konten}
                                   </p>
                                   <div className="flex items-center justify-between pt-6 border-t border-white/20">
                                       <div className="flex items-center gap-4">
                                           <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white border border-white/30">
                                               <FaUser />
                                           </div>
                                           <div>
                                               <p className="text-white font-bold leading-none">{articles[0].penulis || "Alumni Smanda"}</p>
                                               <p className="text-white/60 text-xs uppercase tracking-tighter mt-1 font-black">Kontributor Utama</p>
                                           </div>
                                       </div>
                                       <Link href={`/kolom-alumni/${articles[0].slug}`}>
                                           <Button className="bg-white/10 hover:bg-white text-white hover:text-blue-900 border border-white/30 rounded-2xl px-8 py-3 font-bold transition-all backdrop-blur-md">
                                              Baca Sekarang &rarr;
                                           </Button>
                                       </Link>
                                   </div>
                               </div>
                           </div>
                       </div>
                   ) : (
                        <div className="bg-white p-20 rounded-[40px] border-2 border-dashed border-gray-200 text-center mb-16">
                             <FaPenNib className="mx-auto text-6xl text-gray-200 mb-6" />
                             <h3 className="text-2xl font-bold text-gray-800 mb-2 font-bebas tracking-wide">Belum Ada Jejak Terukir</h3>
                             <p className="text-gray-500 max-w-md mx-auto">Kami menantikan cerita dan pemikiran inspiratif Anda di sini.</p>
                        </div>
                   )}
                   
                   {/* Article Feed Header */}
                   <div className="flex justify-between items-center mb-10 border-b-2 border-gray-100 pb-6">
                       <h2 className="text-3xl font-bold text-gray-900 font-bebas tracking-widest">Inspirasi Alumni</h2>
                       <div className="flex items-center gap-4">
                           <div className="hidden md:flex gap-1">
                               <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-[#1E40AF] shadow-sm"><FaList size={16}/></button>
                               <button className="p-2.5 text-gray-400 hover:text-gray-600"><FaFire size={16}/></button>
                           </div>
                           <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#1E40AF] shadow-sm transition-all">
                               <option>Terbaru</option>
                               <option>Terpopuler</option>
                           </select>
                       </div>
                   </div>

                   {/* Grid Articles */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       {articles.map((item, idx) => (
                           <div key={item._id.toString()} className="flex flex-col group bg-white p-1 rounded-[32px] hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-50">
                               <div className="h-60 rounded-[28px] overflow-hidden relative mb-6 shadow-inner">
                                   <Image 
                                       src={item.gambar_url || "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2070&auto=format&fit=crop"} 
                                       alt={item.judul} 
                                       fill
                                       className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                   />
                                   <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#1E40AF] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                       {item.kategori}
                                   </div>
                               </div>
                               <div className="px-6 pb-6 flex-1 flex flex-col">
                                   <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 uppercase tracking-widest font-black">
                                       <span className="text-[#1E40AF]">CERITA SERU</span> • <span>5 MIN BACA</span>
                                   </div>
                                   <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#1E40AF] transition-colors cursor-pointer font-bebas tracking-wide">
                                       <Link href={`/kolom-alumni/${item.slug}`}>{item.judul}</Link>
                                   </h3>
                                   <p className="text-gray-500 text-sm line-clamp-3 mb-8 leading-relaxed font-medium">
                                       {item.konten}
                                   </p>
                                   <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-50">
                                       <div className="flex items-center gap-3">
                                           <div className="w-10 h-10 bg-blue-50 text-[#1E40AF] rounded-2xl flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm font-bebas">
                                               {(item.penulis || "A")[0]}
                                           </div>
                                           <span className="text-xs font-bold text-gray-800">{item.penulis || "Alumni"}</span>
                                       </div>
                                       <div className="flex gap-4">
                                            <button className="text-gray-300 hover:text-red-500 flex items-center gap-1.5 transition-colors">
                                                <FaRegHeart size={14} /> <span className="text-[10px] font-bold">12</span>
                                            </button>
                                            <button className="text-gray-300 hover:text-blue-500 flex items-center gap-1.5 transition-colors">
                                                <FaRegComment size={14} /> <span className="text-[10px] font-bold">4</span>
                                            </button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       ))}
                   </div>
                   
                   {/* Pagination/Load More */}
                   {articles.length > 6 && (
                        <div className="mt-16 text-center">
                            <Button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-12 py-4 rounded-3xl font-bold shadow-sm transition-all flex items-center gap-3 mx-auto">
                                Muat Lebih Banyak <FaChevronRight size={12} className="text-[#1E40AF]" />
                            </Button>
                        </div>
                   )}

               </div>
           </div>
           
       </div>
    </div>
  );
}
