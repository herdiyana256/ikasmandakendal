"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaStore, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import LapakModal from '@/components/admin/LapakModal';

export default function AlumniLapakClient({ initialLapaks }: { initialLapaks: any[] }) {
    const router = useRouter();
    const [lapaks, setLapaks] = useState(initialLapaks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLapak, setSelectedLapak] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = () => {
        setSelectedLapak(null);
        setIsModalOpen(true);
    };

    const handleEdit = (lapak: any) => {
        setSelectedLapak(lapak);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Hapus lapak ini?')) return;
        try {
            await fetch(`/api/lapak/${id}`, { method: 'DELETE' });
            setLapaks(prev => prev.filter(l => l._id !== id));
            toast.success('Lapak dihapus');
            router.refresh();
        } catch (e) {
            toast.error('Gagal menghapus');
        }
    };

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            if (selectedLapak) {
                // Update
                const res = await fetch(`/api/lapak/${selectedLapak._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error('Update failed');
                toast.success('Lapak diperbarui');
            } else {
                // Create
                const res = await fetch('/api/lapak', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error('Create failed');
                toast.success('Lapak berhasil dibuat');
            }
            setIsModalOpen(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lapak Usaha Saya</h1>
                <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                    <FaPlus /> Tambah Lapak
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lapaks.map((lapak) => (
                    <div key={lapak._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col">
                        <div className="h-48 bg-gray-100 relative">
                             {lapak.gambar_url ? (
                                <img src={lapak.gambar_url} alt={lapak.nama_usaha} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <FaStore size={40} />
                                </div>
                            )}
                             <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold uppercase ${
                                lapak.status === 'approved' ? 'bg-green-100 text-green-800' :
                                lapak.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {lapak.status}
                            </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{lapak.nama_usaha}</h3>
                            <p className="text-xs text-blue-600 font-bold mb-2">{lapak.kategori}</p>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{lapak.deskripsi}</p>
                            
                            <div className="border-t pt-3 flex justify-end gap-2">
                                <button onClick={() => handleEdit(lapak)} className="text-blue-600 p-2 hover:bg-blue-50 rounded"><FaEdit /></button>
                                <button onClick={() => handleDelete(lapak._id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <LapakModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedLapak}
                isLoading={isLoading}
            />
        </div>
    );
}
