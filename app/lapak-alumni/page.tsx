import { Button } from "@/components/ui/Button";
import Link from "next/link";
import connectDB from "@/lib/db";
import LapakAlumni from "@/models/LapakAlumni";
import { FaStore, FaMapMarkerAlt, FaWhatsapp, FaSearch, FaFilter, FaStar, FaPlus } from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function LapakAlumniPage() {
  await connectDB();
  const lapaks = await LapakAlumni.find({ status: 'approved' }).sort({ created_at: -1 });
  const featured = lapaks.slice(0, 3); // Mock featured as first 3
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
       
       {/* Hero Section */}
       <div className="bg-[#1E40AF] text-white pt-20 pb-24 px-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <h1 className="text-4xl md:text-5xl font-bold font-bebas mb-6 relative z-10">Lapak Alumni</h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Dukung usaha rekan-rekan alumni. Temukan produk dan jasa berkualitas dari jaringan kita sendiri.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white p-2 rounded-full shadow-xl flex items-center relative z-10">
                <FaSearch className="text-gray-400 ml-4 hidden md:block" />
                <input 
                    type="text" 
                    placeholder="Cari usaha, produk, atau nama alumni..." 
                    className="flex-1 border-none focus:ring-0 text-gray-900 bg-transparent px-4 py-2" 
                />
                <Button className="bg-[#1E40AF] hover:bg-[#112F82] rounded-full px-8 py-3 font-bold">Cari</Button>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
           
           {/* Featured Lapak */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {featured.map((item, idx) => (
                    <div key={item._id.toString()} className="bg-white rounded-xl shadow-lg border-2 border-yellow-400 overflow-hidden transform hover:-translate-y-1 transition-transform relative">
                         <div className="absolute top-4 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-l-full z-10 shadow-sm">FEATURED</div>
                         <div className="h-44 bg-gray-200 relative group overflow-hidden">
                             {item.gambar_url ? (
                                 <img src={item.gambar_url} alt={item.nama_usaha} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                             ) : (
                                 <div className="w-full h-full flex items-center justify-center text-gray-400">
                                     <FaStore size={40} />
                                 </div>
                             )}
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold cursor-pointer">
                                 Lihat Detail
                             </div>
                         </div>
                         <div className="p-6">
                             <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{item.nama_usaha}</h3>
                                <div className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded">
                                    <FaStar /> 4.9
                                </div>
                             </div>
                             <p className="text-sm text-blue-600 font-bold mb-3">{item.kategori || "Umum"}</p>
                             <p className="text-gray-600 text-sm line-clamp-2 mb-6 h-10">{item.deskripsi}</p>
                             <a 
                                 href={`https://wa.me/${item.no_telepon || item.kontak || '6281234567890'}`} 
                                 target="_blank"
                                 className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                             >
                                 <FaWhatsapp size={18} /> Hubungi Penjual
                             </a>
                         </div>
                    </div>
                ))}
           </div>
           
           <div className="flex flex-col lg:flex-row gap-8 mb-20">
               

               {/* Filters & CTA Sidebar */}
               <div className="w-full lg:w-1/4 space-y-6 sticky top-24 h-fit self-start z-30">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><FaFilter/> Filter Lapak</h3>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-sm text-gray-700 mb-3">Kategori Usaha</h4>
                                <div className="space-y-2">
                                    {['Kuliner', 'Fashion', 'Jasa / Service', 'Properti', 'Otomotif', 'Teknologi'].map(cat => (
                                        <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                                            <input type="checkbox" className="rounded border-gray-300 text-[#1E40AF] focus:ring-[#1E40AF]" />
                                            {cat}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-sm text-gray-700 mb-3">Lokasi</h4>
                                <select className="w-full border-gray-300 rounded-md text-sm focus:ring-[#1E40AF] focus:border-[#1E40AF]">
                                    <option>Semua Lokasi</option>
                                    <option>Kendal</option>
                                    <option>Semarang</option>
                                    <option>Jakarta</option>
                                    <option>Luar Jawa</option>
                                </select>
                            </div>

                            <Button className="w-full bg-[#1E40AF] hover:bg-[#112F82] text-white">Terapkan</Button>
                        </div>
                    </div>
                    
                    {/* CTA Register */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-lg text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            <FaStore />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Punya Usaha?</h3>
                        <p className="text-gray-300 text-sm mb-6">Promosikan produk atau jasa Anda kepada ribuan alumni lainnya secara gratis.</p>
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold flex items-center justify-center gap-2">
                             <FaPlus size={12}/> Daftar Lapak
                        </Button>
                    </div>
               </div>

               {/* Lapak List */}
               <div className="flex-1">
                   <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-gray-900">Semua Lapak ({lapaks.length})</h2>
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                           Urutkan:
                           <select className="border-none bg-transparent font-bold text-gray-900 focus:ring-0 cursor-pointer">
                               <option>Terbaru</option>
                               <option>Terpopuler</option>
                               <option>Nama A-Z</option>
                           </select>
                       </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lapaks.map((item) => (
                            <div key={item._id.toString()} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full group">
                                {/* Image Placeholder / Real Image */}
                                <div className="h-48 bg-gray-100 relative overflow-hidden rounded-t-xl">
                                     {item.gambar_url ? (
                                         <img src={item.gambar_url} alt={item.nama_usaha} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                     ) : (
                                         <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-4xl group-hover:scale-110 transition-transform duration-500">
                                            <FaStore />
                                         </div>
                                     )}
                                     <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold rounded text-gray-700 shadow-sm">
                                         {item.alamat || item.lokasi}
                                     </span>
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{item.nama_usaha}</h3>
                                        {/* Mock Rating */}
                                        <div className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded">
                                            <FaStar /> 4.8
                                        </div>
                                    </div>
                                    <p className="text-sm text-blue-600 font-bold mb-3">{item.kategori || "Umum"}</p>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-1">{item.deskripsi}</p>
                                    
                                    <div className="border-t border-gray-100 pt-4 flex gap-3">
                                        <Button className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-sm h-10 shadow-sm">Detail</Button>
                                        <a 
                                          href={`https://wa.me/${item.no_telepon || item.kontak || '6281234567890'}`}  
                                          target="_blank" 
                                          className="flex-1 bg-[#1E40AF] hover:bg-[#112F82] text-white font-bold text-sm rounded-md flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 h-10"
                                        >
                                            <FaWhatsapp /> Chat
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                   </div>
                   
                   <div className="mt-12 text-center">
                       <Button variant="outline" className="px-10 py-3 border-gray-300 text-gray-600 font-bold hover:border-[#1E40AF] hover:text-[#1E40AF] transition-colors">
                           Muat Lebih Banyak
                       </Button>
                   </div>
               </div>

           </div>
       </div>
    </div>
  );
}
