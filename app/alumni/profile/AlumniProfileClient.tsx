"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AlumniProfileClient({ initialUser }: { initialUser: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nama_depan: initialUser.nama_depan || '',
        nama_belakang: initialUser.nama_belakang || '',
        no_hp: initialUser.no_hp || '',
        tempat_lahir: initialUser.tempat_lahir || '',
        tanggal_lahir: initialUser.tanggal_lahir ? new Date(initialUser.tanggal_lahir).toISOString().split('T')[0] : '',
        alamat_lengkap: initialUser.alamat_lengkap || '',
        kota: initialUser.kota || '',
        pekerjaan: initialUser.status_pekerjaan || '', // Mapping to simple field for now
        instagram: initialUser.instagram || '',
        linkedin: initialUser.linkedin || '',
        angkatan: initialUser.angkatan || '',
        foto_profil: initialUser.foto_profil || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`/api/users/${initialUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Gagal update profil');

            toast.success('Profil berhasil diperbarui');
            router.refresh();
        } catch (error) {
            toast.error('Terjadi kesalahan');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profil Alumni</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 mb-4">
                        {formData.foto_profil ? (
                            <img 
                                src={formData.foto_profil} 
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="text-gray-400 text-4xl">?</span>
                            </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-md">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setIsLoading(true);
                                        const uploadData = new FormData();
                                        uploadData.append('file', file);
                                        
                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: uploadData
                                            });
                                            if (!res.ok) throw new Error('Upload failed');
                                            const data = await res.json();
                                            setFormData(prev => ({ ...prev, foto_profil: data.url }));
                                            toast.success('Foto berhasil diunggah');
                                        } catch (err) {
                                            toast.error('Gagal mengunggah foto');
                                        } finally {
                                            setIsLoading(false);
                                        }
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Depan</label>
                        <input name="nama_depan" value={formData.nama_depan} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Belakang</label>
                        <input name="nama_belakang" value={formData.nama_belakang} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2" required />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email (Tidak dapat diubah)</label>
                        <input value={initialUser.email} disabled className="mt-1 block w-full rounded border-gray-300 bg-gray-100 border p-2 text-gray-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Angkatan (Tahun Lulus SMA)</label>
                        <input name="angkatan" value={formData.angkatan} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2" placeholder="Contoh: 2010" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nomor HP / WA</label>
                        <input name="no_hp" value={formData.no_hp} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2" />
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                        <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Alamat & Pekerjaan</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                        <textarea name="alamat_lengkap" value={formData.alamat_lengkap} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2" rows={3}></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kota Domisili</label>
                            <input name="kota" value={formData.kota} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Pekerjaan Saat Ini</label>
                            <input name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2" placeholder="Contoh: PNS, Wiraswasta, Mahasiswa" />
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-6 border-t">
                    <button type="submit" disabled={isLoading} className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition disabled:opacity-50">
                        {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            </form>
        </div>
    );
}
