"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaNewspaper, FaEdit, FaTrash, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AlumniArtikelClient({ initialArticles }: { initialArticles: any[] }) {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if(!confirm('Hapus artikel ini?')) return;
        try {
            const res = await fetch(`/api/berita/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Gagal menghapus');
            toast.success('Artikel dihapus');
            router.refresh();
        } catch (e) {
            toast.error('Gagal menghapus');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Artikel & Tulisan Saya</h1>
                <Link href="/alumni/artikel/create" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                    <FaPlus /> Tulis Artikel Baru
                </Link>
            </div>

            {initialArticles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <FaNewspaper className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">Belum ada artikel</h3>
                    <p className="text-gray-500 mb-4">Mulai bagikan cerita, pengalaman, atau opini Anda.</p>
                    <Link href="/alumni/artikel/create" className="text-green-600 hover:underline">Mulai Menulis</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialArticles.map((article) => (
                        <div key={article._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                             <div className="h-40 bg-gray-100 relative">
                                {article.gambar_url ? (
                                    <img src={article.gambar_url} alt={article.judul} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <FaNewspaper size={40} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                     {article.status === 'approved' && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold"><FaCheckCircle /> Published</span>}
                                     {article.status === 'pending' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold"><FaClock /> Pending</span>}
                                     {article.status === 'rejected' && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold"><FaTimesCircle /> Rejected</span>}
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <span className="text-xs text-blue-600 font-bold uppercase mb-1">{article.kategori}</span>
                                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{article.judul}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                                    {article.konten.substring(0, 100)}...
                                </p>
                                <div className="border-t pt-3 flex justify-end gap-2">
                                    <Link href={`/alumni/artikel/edit/${article._id}`} className="text-blue-600 p-2 hover:bg-blue-50 rounded" title="Edit">
                                        <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(article._id)} className="text-red-500 p-2 hover:bg-red-50 rounded" title="Hapus">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
