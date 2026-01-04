"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaBriefcase, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import LokerModal from '@/components/admin/LokerModal'; // Reusing Admin Modal
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

export default function AlumniLokerClient({ initialLokers }: { initialLokers: any[] }) {
    const router = useRouter();
    const [lokers, setLokers] = useState(initialLokers);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedLoker, setSelectedLoker] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = () => {
        setSelectedLoker(null);
        setIsFormOpen(true);
    };

    const handleEdit = (loker: any) => {
        setSelectedLoker(loker);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (loker: any) => {
        setSelectedLoker(loker);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            if (selectedLoker) {
                // UPDATE
                const res = await fetch(`/api/loker/${selectedLoker._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (!res.ok) throw new Error('Gagal update lowongan');
                
                toast.success('Lowongan berhasil diupdate');
            } else {
                // CREATE
                const res = await fetch('/api/loker', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!res.ok) throw new Error('Gagal membuat lowongan');
                
                toast.success('Lowongan berhasil dikirim dan menunggu verifikasi Admin.');
            }
            
            setIsFormOpen(false);
            router.refresh(); // Refresh to show new/updated data
        } catch (error: any) {
            toast.error(error.message || 'Terjadi kesalahan');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedLoker) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/loker/${selectedLoker._id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Gagal menghapus lowongan');

            setLokers(prev => prev.filter(l => l._id !== selectedLoker._id));
            toast.success('Lowongan berhasil dihapus');
            setIsDeleteOpen(false);
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
                <h1 className="text-2xl font-bold text-gray-800">Lowongan Kerja Saya</h1>
                <button 
                    onClick={handleCreate}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                    <FaPlus /> Pasang Info Loker
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lokers.map((loker) => (
                    <div key={loker._id} className="bg-white rounded-lg shadow border border-gray-200 p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{loker.judul}</h3>
                                <p className="text-sm text-gray-600">{loker.perusahaan}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                loker.status === 'active' ? 'bg-green-100 text-green-800' : 
                                loker.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {loker.status}
                            </span>
                        </div>
                        
                        <div className="space-y-2 mb-6 flex-1">
                            <p className="text-sm text-gray-500 line-clamp-2">{loker.deskripsi}</p>
                            <div className="flex gap-2 text-xs text-gray-400">
                                <span>📍 {loker.lokasi}</span>
                                <span>• {loker.tipe_pekerjaan}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                             <button 
                                onClick={() => handleEdit(loker)}
                                className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm font-medium transition"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDeleteClick(loker)}
                                className="text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm font-medium transition"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}

                {lokers.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <div className="text-gray-400 mb-2 text-4xl"><FaBriefcase /></div>
                        <p className="text-gray-500">Belum ada lowongan yang Anda posting.</p>
                        <button onClick={handleCreate} className="text-green-600 font-semibold mt-2 hover:underline">Pasang Loker Baru</button>
                    </div>
                )}
            </div>

            <LokerModal 
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={selectedLoker}
                isLoading={isLoading}
            />

            <DeleteConfirmModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Lowongan"
                message="Apakah Anda yakin ingin menghapus lowongan ini?"
                isLoading={isLoading}
            />
        </div>
    );
}
