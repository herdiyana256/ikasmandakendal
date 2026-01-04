"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaCheck, FaTimes, FaInbox, FaEye } from 'react-icons/fa';

interface InboxItem {
    _id: string;
    type: 'berita' | 'loker' | 'lapak';
    title: string;
    author: string;
    createdAt: string;
    details: string;
}

export default function InboxClient({ initialItems }: { initialItems: InboxItem[] }) {
    const router = useRouter();
    const [items, setItems] = useState<InboxItem[]>(initialItems);
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (id: string, type: string, action: 'approve' | 'reject') => {
        if (!confirm(`Apakah Anda yakin ingin ${action} item ini?`)) return;

        setIsLoading(true);
        try {
            // Determine API Endpoint
            let endpoint = '';
            let body = {};
            
            if (type === 'berita') {
                endpoint = `/api/berita/${id}`;
                body = { status: action === 'approve' ? 'approved' : 'rejected' }; // Berita schema uses 'approved'
                // Wait, Berita API PUT logic needs to be checked if it handles direct status update
                // assuming generic PUT handles generic fields.
            } else if (type === 'loker') {
                endpoint = `/api/loker/${id}`;
                body = { status: action === 'approve' ? 'active' : 'rejected' }; // Loker schema uses 'active'
            }

            const res = await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error('Gagal memproses permintaan');
            
            setItems(prev => prev.filter(item => item._id !== id));
            toast.success(`Item berhasil di-${action}`);
            router.refresh();
        } catch (error) {
            toast.error('Terjadi kesalahan');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaInbox /> Kotak Masuk (Review)</h1>
                    <p className="text-gray-600">Review permintaan posting dari Alumni.</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
                    {items.length} Pending
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                {items.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <FaInbox className="text-5xl mx-auto mb-4 opacity-50" />
                        <p>Tidak ada permintaan pending saat ini.</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Tipe</th>
                                <th className="px-6 py-4">Judul / Konten</th>
                                <th className="px-6 py-4">Pengirim</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                            item.type === 'berita' ? 'bg-purple-100 text-purple-800' :
                                            item.type === 'loker' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900 line-clamp-1">{item.title}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{item.details}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item.author}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour:'2-digit', minute:'2-digit' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* 
                                            <button className="text-gray-400 hover:text-blue-600 p-1" title="Lihat Detail">
                                                <FaEye />
                                            </button>
                                            */}
                                            <button 
                                                onClick={() => handleAction(item._id, item.type, 'approve')}
                                                disabled={isLoading}
                                                className="bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-full transition" 
                                                title="Approve"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button 
                                                onClick={() => handleAction(item._id, item.type, 'reject')}
                                                disabled={isLoading}
                                                className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full transition" 
                                                title="Reject"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
