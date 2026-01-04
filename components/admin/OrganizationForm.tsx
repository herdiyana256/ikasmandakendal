"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

interface Pengurus {
    nama: string;
    jabatan: string;
    foto_url: string;
    linkedin_url: string;
}

interface OrganizationFormProps {
    initialData: any;
}

export default function OrganizationForm({ initialData }: OrganizationFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        visi: initialData?.visi || '',
        misi: initialData?.misi || [''],
        sejarah: initialData?.sejarah || '',
        struktur_pengurus: initialData?.struktur_pengurus || [] as Pengurus[],
    });

    const handleMisiChange = (index: number, value: string) => {
        const newMisi = [...formData.misi];
        newMisi[index] = value;
        setFormData({ ...formData, misi: newMisi });
    };

    const addMisi = () => {
        setFormData({ ...formData, misi: [...formData.misi, ''] });
    };

    const removeMisi = (index: number) => {
        const newMisi = formData.misi.filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, misi: newMisi });
    };

    const handlePengurusChange = (index: number, field: keyof Pengurus, value: string) => {
        const newPengurus = [...formData.struktur_pengurus];
        newPengurus[index] = { ...newPengurus[index], [field]: value };
        setFormData({ ...formData, struktur_pengurus: newPengurus });
    };

    const addPengurus = () => {
        setFormData({ 
            ...formData, 
            struktur_pengurus: [...formData.struktur_pengurus, { nama: '', jabatan: '', foto_url: '', linkedin_url: '' }] 
        });
    };

     const removePengurus = (index: number) => {
        const newPengurus = formData.struktur_pengurus.filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, struktur_pengurus: newPengurus });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Filter empty misi
        const cleanFormData = {
            ...formData,
            misi: formData.misi.filter((m: string) => m.trim() !== '')
        };

        try {
            const res = await fetch('/api/organization', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanFormData)
            });

            if (!res.ok) throw new Error('Gagal menyimpan data organisasi');

            toast.success('Informasi Organisasi diperbarui');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-6 rounded shadow border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Visi & Misi</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
                    <textarea 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                        value={formData.visi}
                        onChange={e => setFormData({...formData, visi: e.target.value})}
                        placeholder="Visi IKA SMANDA..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Misi</label>
                    {formData.misi.map((m: string, index: number) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input 
                                type="text" 
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={m}
                                onChange={e => handleMisiChange(index, e.target.value)}
                                placeholder={`Misi ${index + 1}`}
                            />
                            <button 
                                type="button" 
                                onClick={() => removeMisi(index)}
                                className="text-red-500 hover:text-red-700 p-2"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addMisi}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
                    >
                        <FaPlus size={12} /> Tambah Misi
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded shadow border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Sejarah</h2>
                <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-48"
                    value={formData.sejarah}
                    onChange={e => setFormData({...formData, sejarah: e.target.value})}
                    placeholder="Sejarah singkat organisasi..."
                />
            </div>

            <div className="bg-white p-6 rounded shadow border border-gray-200">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-bold text-gray-800">Susunan Pengurus</h2>
                    <button 
                        type="button" 
                        onClick={addPengurus}
                        className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 flex items-center gap-1"
                    >
                        <FaPlus size={12} /> Tambah Pengurus
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.struktur_pengurus.map((p: Pengurus, index: number) => (
                        <div key={index} className="border rounded-lg p-4 bg-gray-50 relative group">
                            <button 
                                type="button" 
                                onClick={() => removePengurus(index)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                            >
                                <FaTrash />
                            </button>
                            <div className="space-y-3">
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                                    placeholder="Nama Lengkap"
                                    value={p.nama}
                                    onChange={e => handlePengurusChange(index, 'nama', e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-sm font-semibold"
                                    placeholder="Jabatan"
                                    value={p.jabatan}
                                    onChange={e => handlePengurusChange(index, 'jabatan', e.target.value)}
                                />
                                <input 
                                    type="url" 
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-xs"
                                    placeholder="URL Foto"
                                    value={p.foto_url}
                                    onChange={e => handlePengurusChange(index, 'foto_url', e.target.value)}
                                />
                                <input 
                                    type="url" 
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-xs"
                                    placeholder="LinkedIn URL"
                                    value={p.linkedin_url}
                                    onChange={e => handlePengurusChange(index, 'linkedin_url', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                    <FaSave />
                    {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
        </form>
    );
}
