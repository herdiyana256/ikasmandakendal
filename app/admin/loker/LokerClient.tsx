"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaBriefcase, FaBuilding } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import LokerModal from '@/components/admin/LokerModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

interface Loker {
    _id: string;
    judul: string;
    perusahaan: string;
    tipe_pekerjaan: string;
    lokasi: string;
    status: string;
}

interface LokerClientProps {
    initialLoker: Loker[];
}

export default function LokerClient({ initialLoker }: LokerClientProps) {
    const router = useRouter();
    const [loker, setLoker] = useState<Loker[]>(initialLoker);
    
    // Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedLoker, setSelectedLoker] = useState<Loker | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handlers
    const handleCreate = () => {
        setSelectedLoker(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: Loker) => {
        setSelectedLoker(item);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (item: Loker) => {
        setSelectedLoker(item);
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
                
                if (!res.ok) throw new Error('Gagal mengupdate loker');
                
                const updated = await res.json();
                setLoker(prev => prev.map(l => l._id === selectedLoker._id ? { ...l, ...updated.loker } : l));
                toast.success('Loker berhasil diupdate');
            } else {
                // CREATE
                const res = await fetch('/api/loker', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || 'Gagal membuat loker');
                }

                const created = await res.json();
                setLoker([created.loker, ...loker]); 
                toast.success('Loker berhasil dibuat');
            }
            setIsFormOpen(false);
            router.refresh(); 
        } catch (error: any) {
             toast.error(error.message);
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

            if (!res.ok) throw new Error('Gagal menghapus loker');

            setLoker(prev => prev.filter(l => l._id !== selectedLoker._id));
            toast.success('Loker berhasil dihapus');
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
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lowongan Kerja</h1>
                    <p className="text-gray-600">Kelola informasi lowongan pekerjaan untuk alumni.</p>
                </div>
                <button 
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <FaBriefcase /> + Tambah Loker
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 border-b">Posisi</th>
                                <th className="px-6 py-4 border-b">Perusahaan</th>
                                <th className="px-6 py-4 border-b">Tipe/Lokasi</th>
                                <th className="px-6 py-4 border-b text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loker.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {item.judul}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <FaBuilding className="text-gray-400"/>
                                            {item.perusahaan}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded w-fit mb-1">{item.tipe_pekerjaan}</span>
                                            <span className="text-xs text-gray-500">{item.lokasi}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:bg-blue-50 p-2 rounded transition" 
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(item)}
                                                className="text-red-600 hover:bg-red-50 p-2 rounded transition" 
                                                title="Hapus"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {loker.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Belum ada lowongan kerja.
                    </div>
                )}
            </div>

            {/* Modals */}
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
                message={`Apakah Anda yakin ingin menghapus lowongan "${selectedLoker?.judul}" di ${selectedLoker?.perusahaan}?`}
                isLoading={isLoading}
            />
        </div>
    );
}
