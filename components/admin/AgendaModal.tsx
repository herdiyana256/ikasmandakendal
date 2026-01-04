"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaCalendarPlus, FaEdit } from 'react-icons/fa';

interface AgendaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
    isLoading?: boolean;
}

export default function AgendaModal({ isOpen, onClose, onSubmit, initialData, isLoading }: AgendaModalProps) {
    const [formData, setFormData] = useState({
        judul: '',
        deskripsi: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        lokasi: '',
        gambar_url: '',
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Ensure dates are formatted for input type="datetime-local" if needed, or just date
                // Simplification: using string or handling date parsing
                setFormData({
                    judul: initialData.judul || '',
                    deskripsi: initialData.deskripsi || '',
                    tanggal_mulai: initialData.tanggal_mulai ? new Date(initialData.tanggal_mulai).toISOString().slice(0, 16) : '',
                    tanggal_selesai: initialData.tanggal_selesai ? new Date(initialData.tanggal_selesai).toISOString().slice(0, 16) : '',
                    lokasi: initialData.lokasi || '',
                    gambar_url: initialData.gambar_url || '',
                });
            } else {
                setFormData({
                    judul: '',
                    deskripsi: '',
                    tanggal_mulai: '',
                    tanggal_selesai: '',
                    lokasi: '',
                    gambar_url: '',
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <form onSubmit={handleSubmit}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${initialData ? 'bg-blue-100' : 'bg-green-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                                                {initialData ? <FaEdit className="h-6 w-6 text-blue-600" /> : <FaCalendarPlus className="h-6 w-6 text-green-600" />}
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    {initialData ? 'Edit Agenda' : 'Tambah Agenda Baru'}
                                                </Dialog.Title>
                                                
                                                <div className="mt-4 grid grid-cols-1 gap-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Judul Agenda</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.judul}
                                                            onChange={e => setFormData({...formData, judul: e.target.value})}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                         <div>
                                                            <label className="block text-sm font-medium text-gray-700">Mulai</label>
                                                            <input 
                                                                type="datetime-local" 
                                                                required 
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                                value={formData.tanggal_mulai}
                                                                onChange={e => setFormData({...formData, tanggal_mulai: e.target.value})}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Selesai</label>
                                                            <input 
                                                                type="datetime-local" 
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                                value={formData.tanggal_selesai}
                                                                onChange={e => setFormData({...formData, tanggal_selesai: e.target.value})}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                                                        <input 
                                                            type="text" 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.lokasi}
                                                            onChange={e => setFormData({...formData, lokasi: e.target.value})}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
                                                        <input 
                                                            type="url" 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.gambar_url}
                                                            onChange={e => setFormData({...formData, gambar_url: e.target.value})}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                                        <textarea 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 h-24"
                                                            value={formData.deskripsi}
                                                            onChange={e => setFormData({...formData, deskripsi: e.target.value})}
                                                        />
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
