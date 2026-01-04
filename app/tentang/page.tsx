import Link from "next/link";
import { FaHistory, FaBullseye, FaHandshake } from "react-icons/fa";

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-[#1E40AF] text-white py-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
             <h1 className="text-5xl font-bold font-bebas mb-4 tracking-wide">Tentang IKA SMANDA</h1>
             <p className="text-xl max-w-2xl mx-auto text-blue-100">
                Mengenal lebih dekat Ikatan Alumni SMA Negeri 1 Kendal.
             </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
          {/* Sejarah */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
                 <div className="inline-block p-3 bg-blue-50 rounded-lg text-[#1E40AF] mb-4">
                     <FaHistory size={24} />
                 </div>
                 <h2 className="text-3xl font-bold font-bebas text-gray-900 mb-6">Sejarah Kami</h2>
                 <p className="text-gray-600 leading-relaxed mb-4">
                     Ikatan Alumni SMA Negeri 1 Kendal (IKASMAN1K) didirikan sebagai wadah silaturahmi bagi seluruh lulusan SMA Negeri 1 Kendal dari berbagai angkatan. Organisasi ini lahir dari keinginan kuat untuk tetap terhubung dan memberikan kontribusi nyata bagi almamater serta masyarakat luas.
                 </p>
                 <p className="text-gray-600 leading-relaxed">
                     Sejak awal berdirinya, IKASMAN1K telah aktif dalam berbagai kegiatan sosial, pendidikan, dan pengembangan jaringan profesional antar alumni.
                 </p>
             </div>
             <div className="h-[400px] bg-gray-100 rounded-2xl relative overflow-hidden shadow-lg">
                 {/* Placeholder for history image */}
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                     Image: Sejarah / Gedung Sekolah Lama
                 </div>
             </div>
          </section>

          {/* Visi Misi */}
          <section className="bg-gray-50 rounded-3xl p-12 text-center">
             <div className="inline-block p-3 bg-white rounded-lg text-[#1E40AF] shadow-sm mb-6">
                 <FaBullseye size={24} />
             </div>
             <h2 className="text-3xl font-bold font-bebas text-gray-900 mb-8">Visi & Misi</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                     <h3 className="text-xl font-bold text-[#1E40AF] mb-4">Visi</h3>
                     <p className="text-gray-700 italic">
                         "Menjadi organisasi alumni yang solid, mandiri, dan bermanfaat bagi anggota, almamater, serta masyarakat."
                     </p>
                 </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                     <h3 className="text-xl font-bold text-[#1E40AF] mb-4">Misi</h3>
                     <ul className="space-y-3 text-gray-700 list-disc pl-5">
                         <li>Mempererat tali persaudaraan antar alumni.</li>
                         <li>Membangun jejaring kerjasama profesional.</li>
                         <li>Memberikan kontribusi positif bagi kemajuan SMA N 1 Kendal.</li>
                         <li>Menyelenggarakan kegiatan sosial kemasyarakatan.</li>
                     </ul>
                 </div>
             </div>
          </section>

           {/* Values */}
           <section className="text-center">
                <div className="inline-block p-3 bg-blue-50 rounded-lg text-[#1E40AF] mb-6">
                     <FaHandshake size={24} />
                </div>
                <h2 className="text-3xl font-bold font-bebas text-gray-900 mb-12">Nilai-Nilai Kami</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { title: "Guyub", desc: "Rukun dan kebersamaan dalam setiap langkah." },
                        { title: "Gayeng", desc: "Suasana yang menyenangkan dan penuh keakraban." },
                        { title: "Mukti Bareng", desc: "Sukses dan sejahtera bersama-sama." },
                        { title: "Migunani", desc: "Bermanfaat bagi sesama dan lingkungan." }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#1E40AF] transition-colors shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
           </section>
      </div>
    </div>
  );
}
