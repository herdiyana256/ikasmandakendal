"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import AgendaModal from '@/components/admin/AgendaModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

interface Agenda {
    _id: string;
    judul: string;
    deskripsi: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    lokasi: string;
    gambar_url?: string;
}

interface AgendaClientProps {
    initialAgenda: Agenda[];
}

export default function AgendaClient({ initialAgenda }: AgendaClientProps) {
    const router = useRouter();
    const [agenda, setAgenda] = useState<Agenda[]>(initialAgenda);
    
    // Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handlers
    const handleCreate = () => {
        setSelectedAgenda(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: Agenda) => {
        setSelectedAgenda(item);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (item: Agenda) => {
        setSelectedAgenda(item);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            if (selectedAgenda) {
                // UPDATE
                const res = await fetch(`/api/agenda/${selectedAgenda._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (!res.ok) throw new Error('Gagal mengupdate agenda');
                
                const updated = await res.json();
                setAgenda(prev => prev.map(a => a._id === selectedAgenda._id ? { ...a, ...updated.agenda } : a));
                toast.success('Agenda berhasil diupdate');
            } else {
                // CREATE
                const res = await fetch('/api/agenda', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || 'Gagal membuat agenda');
                }

                const created = await res.json();
                 // Optimistic add might need refresh for complex formats, but adding here
                setAgenda([created.agenda, ...agenda]); 
                toast.success('Agenda berhasil dibuat');
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
        if (!selectedAgenda) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/agenda/${selectedAgenda._id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Gagal menghapus agenda');

            setAgenda(prev => prev.filter(a => a._id !== selectedAgenda._id));
            toast.success('Agenda berhasil dihapus');
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
                    <h1 className="text-2xl font-bold text-gray-900">Agenda Kegiatan</h1>
                    <p className="text-gray-600">Kelola jadwal event dan kegiatan alumni.</p>
                </div>
                <button 
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <FaCalendarAlt /> + Tambah Agenda
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 border-b">Agenda</th>
                                <th className="px-6 py-4 border-b">Tanggal</th>
                                <th className="px-6 py-4 border-b">Lokasi</th>
                                <th className="px-6 py-4 border-b text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {agenda.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{item.judul}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{item.deskripsi}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-gray-700 flex flex-col">
                                            <span>Mulai: {new Date(item.tanggal_mulai).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            {item.tanggal_selesai && (
                                                 <span className="text-gray-500">Selesai: {new Date(item.tanggal_selesai).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            )}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-xs">
                                            <FaMapMarkerAlt className="text-red-500" />
                                            {item.lokasi || '-'}
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
                {agenda.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Belum ada agenda kegiatan.
                    </div>
                )}
            </div>

            {/* Modals */}
            <AgendaModal 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleFormSubmit} 
                initialData={selectedAgenda}
                isLoading={isLoading}
            />

            <DeleteConfirmModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Agenda"
                message={`Apakah Anda yakin ingin menghapus agenda "${selectedAgenda?.judul}"?`}
                isLoading={isLoading}
            />
        </div>
    );
}
