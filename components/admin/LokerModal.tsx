"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaBriefcase, FaEdit } from 'react-icons/fa';

interface LokerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
    isLoading?: boolean;
}

export default function LokerModal({ isOpen, onClose, onSubmit, initialData, isLoading }: LokerModalProps) {
    const [formData, setFormData] = useState({
        judul: '',
        perusahaan: '',
        tipe_pekerjaan: 'Full Time',
        lokasi: '',
        gaji_min: '',
        gaji_max: '',
        deadline: '',
        deskripsi: '',
        requirements: ''
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    judul: initialData.judul || '',
                    perusahaan: initialData.perusahaan || '',
                    tipe_pekerjaan: initialData.tipe_pekerjaan || 'Full Time',
                    lokasi: initialData.lokasi || '',
                    gaji_min: initialData.gaji_min || '',
                    gaji_max: initialData.gaji_max || '',
                    deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().slice(0, 10) : '',
                    deskripsi: initialData.deskripsi || '',
                    requirements: initialData.requirements || '',
                });
            } else {
                setFormData({
                    judul: '',
                    perusahaan: '',
                    tipe_pekerjaan: 'Full Time',
                    lokasi: '',
                    gaji_min: '',
                    gaji_max: '',
                    deadline: '',
                    deskripsi: '',
                    requirements: ''
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                <form onSubmit={handleSubmit}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${initialData ? 'bg-blue-100' : 'bg-green-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                                                {initialData ? <FaEdit className="h-6 w-6 text-blue-600" /> : <FaBriefcase className="h-6 w-6 text-green-600" />}
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    {initialData ? 'Edit Lowongan' : 'Tambah Lowongan Kerja'}
                                                </Dialog.Title>
                                                
                                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Judul Posisi</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.judul}
                                                            onChange={e => setFormData({...formData, judul: e.target.value})}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Perusahaan</label>
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.perusahaan}
                                                            onChange={e => setFormData({...formData, perusahaan: e.target.value})}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Tipe</label>
                                                         <select
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.tipe_pekerjaan}
                                                            onChange={e => setFormData({...formData, tipe_pekerjaan: e.target.value})}
                                                        >
                                                            <option value="Full Time">Full Time</option>
                                                            <option value="Part Time">Part Time</option>
                                                            <option value="Contract">Contract</option>
                                                            <option value="Freelance">Freelance</option>
                                                            <option value="Internship">Internship</option>
                                                        </select>
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
                                                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                                        <input 
                                                            type="date" 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.deadline}
                                                            onChange={e => setFormData({...formData, deadline: e.target.value})}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Gaji Min (Rp)</label>
                                                        <input 
                                                            type="number" 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.gaji_min}
                                                            onChange={e => setFormData({...formData, gaji_min: e.target.value})}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Gaji Max (Rp)</label>
                                                        <input 
                                                            type="number" 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                                            value={formData.gaji_max}
                                                            onChange={e => setFormData({...formData, gaji_max: e.target.value})}
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                                        <textarea 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 h-20"
                                                            value={formData.deskripsi}
                                                            onChange={e => setFormData({...formData, deskripsi: e.target.value})}
                                                        />
                                                    </div>

                                                     <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Persyaratan</label>
                                                        <textarea 
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 h-20"
                                                            value={formData.requirements}
                                                            onChange={e => setFormData({...formData, requirements: e.target.value})}
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
