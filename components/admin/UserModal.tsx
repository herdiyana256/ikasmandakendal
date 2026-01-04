"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaUserPlus, FaUserEdit } from 'react-icons/fa';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: any; // If null, mode is Create
    isLoading?: boolean;
}

export default function UserModal({ isOpen, onClose, onSubmit, initialData, isLoading }: UserModalProps) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '', // Only for creation
        nama_depan: '',
        nama_belakang: '',
        role: 'alumni',
        is_verified: true,
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    ...initialData,
                    password: '', // Don't populate password on edit
                });
            } else {
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    nama_depan: '',
                    nama_belakang: '',
                    role: 'alumni',
                    is_verified: true,
                });
            }
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                                <form onSubmit={handleSubmit}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${initialData ? 'bg-blue-100' : 'bg-green-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                                                {initialData ? <FaUserEdit className="h-6 w-6 text-blue-600" /> : <FaUserPlus className="h-6 w-6 text-green-600" />}
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    {initialData ? 'Edit User' : 'Tambah User Baru'}
                                                </Dialog.Title>
                                                
                                                <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                                                    {/* READ ONLY FIELDS FOR EDIT (Except Role/Verified) */}
                                                    <div className="sm:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Username</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            disabled={initialData}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-gray-50 disabled:text-gray-500"
                                                            value={formData.username}
                                                            onChange={e => setFormData({...formData, username: e.target.value})}
                                                        />
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                                        <input 
                                                            type="email" 
                                                            required 
                                                            disabled={initialData}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-gray-50 disabled:text-gray-500"
                                                            value={formData.email}
                                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                                        />
                                                    </div>

                                                    {!initialData && (
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700">Password</label>
                                                            <input 
                                                                type="password" 
                                                                required 
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                                value={formData.password}
                                                                onChange={e => setFormData({...formData, password: e.target.value})}
                                                            />
                                                        </div>
                                                    )}

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Nama Depan</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            disabled={initialData}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 disabled:bg-gray-50"
                                                            value={formData.nama_depan}
                                                            onChange={e => setFormData({...formData, nama_depan: e.target.value})}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Nama Belakang</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            disabled={initialData}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 disabled:bg-gray-50"
                                                            value={formData.nama_belakang}
                                                            onChange={e => setFormData({...formData, nama_belakang: e.target.value})}
                                                        />
                                                    </div>
                                                    
                                                    <div className="sm:col-span-2 border-t pt-4 mt-2">
                                                        <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wide">Pengaturan Akses</p>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Role</label>
                                                        <select
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.role}
                                                            onChange={e => setFormData({...formData, role: e.target.value})}
                                                        >
                                                            <option value="user">User (Guest)</option>
                                                            <option value="alumni">Alumni</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="IT">IT Support</option>
                                                        </select>
                                                    </div>

                                                    <div className="flex items-center pt-6">
                                                        <input
                                                            id="is_verified"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            checked={formData.is_verified}
                                                            onChange={e => setFormData({...formData, is_verified: e.target.checked})}
                                                        />
                                                        <label htmlFor="is_verified" className="ml-2 block text-sm text-gray-900">
                                                            Verified User
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:opacity-50"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Menyimpan...' : 'Simpan'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={onClose}
                                            disabled={isLoading}
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
