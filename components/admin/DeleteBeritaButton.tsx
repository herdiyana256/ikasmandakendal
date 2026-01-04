"use client";

import { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function DeleteBeritaButton({ id, title }: { id: string, title: string }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/berita/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Gagal menghapus berita');

            toast.success('Berita dihapus');
            setIsOpen(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="text-red-600 hover:bg-red-100 p-2 rounded"
                title="Hapus Berita"
            >
                <FaTrash />
            </button>

            <DeleteConfirmModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleDelete}
                title="Hapus Berita"
                message={`Apakah Anda yakin ingin menghapus berita "${title}"?`}
                isLoading={isLoading}
            />
        </>
    );
}
