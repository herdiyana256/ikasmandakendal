"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaHandHoldingHeart } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import DonasiModal from '@/components/admin/DonasiModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

interface Donasi {
    _id: string;
    nama_campaign: string;
    deskripsi: string;
    target_amount: number;
    current_amount: number;
    deadline: string;
    status: string;
}

interface DonasiClientProps {
    initialDonasi: Donasi[];
}

export default function DonasiClient({ initialDonasi }: DonasiClientProps) {
    const router = useRouter();
    const [donasi, setDonasi] = useState<Donasi[]>(initialDonasi);
    
    // Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedDonasi, setSelectedDonasi] = useState<Donasi | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handlers
    const handleCreate = () => {
        setSelectedDonasi(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: Donasi) => {
        setSelectedDonasi(item);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (item: Donasi) => {
        setSelectedDonasi(item);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            if (selectedDonasi) {
                // UPDATE
                const res = await fetch(`/api/donasi/${selectedDonasi._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (!res.ok) throw new Error('Gagal mengupdate donasi');
                
                const updated = await res.json();
                setDonasi(prev => prev.map(d => d._id === selectedDonasi._id ? { ...d, ...updated.donasi } : d));
                toast.success('Donasi berhasil diupdate');
            } else {
                // CREATE
                const res = await fetch('/api/donasi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || 'Gagal membuat donasi');
                }

                const created = await res.json();
                setDonasi([created.donasi, ...donasi]); 
                toast.success('Donasi berhasil dibuat');
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
        if (!selectedDonasi) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/donasi/${selectedDonasi._id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Gagal menghapus donasi');

            setDonasi(prev => prev.filter(d => d._id !== selectedDonasi._id));
            toast.success('Donasi berhasil dihapus');
            setIsDeleteOpen(false);
            router.refresh();
        } catch (error: any) {
             toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Donasi & Bantuan</h1>
                    <p className="text-gray-600">Kelola program penggalangan dana sosial.</p>
                </div>
                <button 
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <FaHandHoldingHeart /> + Buat Program
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 border-b">Campaign</th>
                                <th className="px-6 py-4 border-b">Target / Terkumpul</th>
                                <th className="px-6 py-4 border-b">Deadline</th>
                                <th className="px-6 py-4 border-b">Status</th>
                                <th className="px-6 py-4 border-b text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {donasi.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {item.nama_campaign}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">Target: {formatCurrency(item.target_amount)}</span>
                                            <span className="font-bold text-green-600">Terkumpul: {formatCurrency(item.current_amount || 0)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs">
                                        {item.deadline ? new Date(item.deadline).toLocaleDateString('id-ID') : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            item.status === 'active' ? 'bg-green-100 text-green-800' :
                                            item.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                         }`}>
                                            {item.status.toUpperCase()}
                                        </span>
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
                {donasi.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Belum ada program donasi.
                    </div>
                )}
            </div>

            {/* Modals */}
            <DonasiModal 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleFormSubmit} 
                initialData={selectedDonasi}
                isLoading={isLoading}
            />

            <DeleteConfirmModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Program Donasi"
                message={`Apakah Anda yakin ingin menghapus program "${selectedDonasi?.nama_campaign}"?`}
                isLoading={isLoading}
            />
        </div>
    );
}
