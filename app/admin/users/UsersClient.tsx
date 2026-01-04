"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaUserShield, FaUserGraduate, FaKey } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import UserModal from '@/components/admin/UserModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

interface User {
    _id: string;
    username: string;
    email: string;
    nama_depan: string;
    nama_belakang: string;
    role: string;
    is_verified: boolean;
    createdAt: string;
}

interface UsersClientProps {
    initialUsers: User[]; // Serializable user objects
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>(initialUsers);
    
    // Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handlers
    const handleCreate = () => {
        setSelectedUser(null);
        setIsFormOpen(true);
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (data: Partial<User>) => {
        setIsLoading(true);
        try {
            if (selectedUser) {
                // UPDATE
                const res = await fetch(`/api/users/${selectedUser._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (!res.ok) throw new Error('Gagal mengupdate user');
                
                const updated = await res.json();
                setUsers(prev => prev.map(u => u._id === selectedUser._id ? { ...u, ...updated.user } : u));
                toast.success('User berhasil diupdate');
            } else {
                // CREATE
                const res = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || 'Gagal membuat user');
                }

                const created = await res.json();
                // Refresh list or add locally (Adding locally for speed, usually need refresh for Sort order)
                setUsers([created.user, ...users]); 
                toast.success('User berhasil dibuat');
            }
            setIsFormOpen(false);
            router.refresh(); // Refresh server data
        } catch (error: unknown) {
             const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedUser) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/users/${selectedUser._id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Gagal menghapus user');

            setUsers(prev => prev.filter(u => u._id !== selectedUser._id));
            toast.success('User berhasil dihapus');
            setIsDeleteOpen(false);
            router.refresh();
        } catch (error: unknown) {
             const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateToken = async (user: User) => {
        if (!confirm(`Generate API Token untuk user ${user.username}? Token lama akan hangus.`)) return;
        
        try {
            const res = await fetch(`/api/users/${user._id}/token`, {
                method: 'POST'
            });

            if (!res.ok) throw new Error('Gagal generate token');

            const data = await res.json();
            // Show token in a persistent toast or alert because it's sensitive
            alert(`API Token Berhasil dibuat:\n\n${data.api_token}\n\nSimpan token ini karena tidak akan muncul lagi!`);
            toast.success('Token berhasil dibuat');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
            toast.error(message);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
                    <p className="text-gray-600">Kelola akun Admin, Staff, dan Alumni (IT Access Only).</p>
                </div>
                <button 
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <FaUserShield /> + Tambah User
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 border-b">User Info</th>
                                <th className="px-6 py-4 border-b">Role</th>
                                <th className="px-6 py-4 border-b">Status</th>
                                <th className="px-6 py-4 border-b">Bergabung</th>
                                <th className="px-6 py-4 border-b text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                                user.role === 'IT' ? 'bg-purple-600' : 
                                                user.role === 'admin' ? 'bg-blue-600' : 'bg-gray-400'
                                            }`}>
                                                {user.username[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{user.nama_depan} {user.nama_belakang}</p>
                                                <p className="text-xs text-gray-500">@{user.username}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                       <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            user.role === 'IT' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                       }`}>
                                            {user.role === 'IT' && <FaUserShield />}
                                            {user.role === 'alumni' && <FaUserGraduate />}
                                            {user.role}
                                       </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.is_verified ? (
                                            <span className="text-green-600 flex items-center gap-1 text-xs font-bold"><FaCheckCircle/> Verified</span>
                                        ) : (
                                            <span className="text-yellow-600 flex items-center gap-1 text-xs font-bold"><FaTimesCircle/> Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(user.createdAt).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleGenerateToken(user)}
                                                className="text-purple-600 hover:bg-purple-50 p-2 rounded transition" 
                                                title="Generate API Token"
                                            >
                                                <FaKey />
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(user)}
                                                className="text-blue-600 hover:bg-blue-50 p-2 rounded transition" 
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            {user.role !== 'IT' && (
                                                <button 
                                                    onClick={() => handleDeleteClick(user)}
                                                    className="text-red-600 hover:bg-red-50 p-2 rounded transition" 
                                                    title="Hapus"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {users.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Tidak ada user ditemukan.
                    </div>
                )}
            </div>

            {/* Modals */}
            <UserModal 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleFormSubmit} 
                initialData={selectedUser}
                isLoading={isLoading}
            />

            <DeleteConfirmModal 
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Hapus User"
                message={`Apakah Anda yakin ingin menghapus user ${selectedUser?.username}? Aksi ini tidak dapat dibatalkan.`}
                isLoading={isLoading}
            />
        </div>
    );
}
