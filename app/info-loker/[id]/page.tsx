import { Button } from "@/components/ui/Button";
import connectDB from "@/lib/db";
import LowonganKerja from "@/models/LowonganKerja";
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaBriefcase, FaShareAlt, FaCheckCircle, FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        id: string;
    }
}

export default async function JobDetailPage({ params }: PageProps) {
  await connectDB();
  
  let job;
  try {
      job = await LowonganKerja.findById(params.id);
  } catch (e) {
      notFound();
  }

  if (!job) notFound();

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <Link href="/info-loker" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1E40AF] mb-6 font-medium">
                <FaChevronLeft size={12} /> Kembali ke Info Loker
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center text-[#1E40AF] text-3xl shadow-sm">
                        <FaBuilding />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                        <div className="flex items-center gap-2 text-lg text-gray-600 font-medium mb-4">
                            {job.company} 
                            <span className="text-gray-300">•</span> 
                            <span className="text-[#1E40AF] text-sm font-bold bg-blue-50 px-3 py-0.5 rounded-full">Verified</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                             <span className="flex items-center gap-1.5"><FaBriefcase className="text-gray-400"/> {job.type}</span>
                             <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-gray-400"/> {job.location}</span>
                             <span className="flex items-center gap-1.5"><FaMoneyBillWave className="text-gray-400"/> {job.salary}</span>
                             <span className="flex items-center gap-1.5"><FaClock className="text-gray-400"/> Diposting 2 hari lalu</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <Button className="w-full bg-[#1E40AF] hover:bg-[#112F82] font-bold px-8 py-3 shadow-lg">Lamar Sekarang</Button>
                        <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"><FaShareAlt className="mr-2"/> Bagikan</Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
                            <div className="text-gray-600 leading-relaxed space-y-4">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Tanggung Jawab</h2>
                            <ul className="space-y-3">
                                {[1,2,3,4].map((i) => (
                                    <li key={i} className="flex gap-3 text-gray-600 items-start">
                                        <FaCheckCircle className="text-[#1E40AF] mt-1 shrink-0" size={16} />
                                        <span>Collaborate with cross-functional teams to define, design, and ship new features.</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                             <h2 className="text-xl font-bold text-gray-900 mb-4">Kualifikasi</h2>
                             <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                 <li>Bachelor's degree in Computer Science or related field.</li>
                                 <li>3+ years of experience in software development.</li>
                                 <li>Strong proficiency in JavaScript, React, and Node.js.</li>
                                 <li>Experience with MongoDB and RESTful APIs.</li>
                             </ul>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Tentang Perusahaan</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Perusahaan teknologi terkemuka yang berfokus pada solusi digital inovatif untuk UMKM di Indonesia.
                            </p>
                            <Link href="#" className="text-[#1E40AF] font-bold text-sm hover:underline">Kunjungi Website &rarr;</Link>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                             <h3 className="font-bold text-[#1E40AF] mb-2">Tips untuk Pelamar</h3>
                             <p className="text-sm text-gray-600 mb-4">
                                 Pastikan CV Anda terbaru dan portfolio Anda dapat diakses. Tuliskan cover letter yang spesifik untuk posisi ini.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
