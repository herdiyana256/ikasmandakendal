"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaSave, FaArrowLeft, FaImage, FaCloudUploadAlt } from 'react-icons/fa';
import Link from 'next/link';

interface BeritaFormProps {
    initialData?: any;
    isEdit?: boolean;
    isAdmin?: boolean;
}

export default function BeritaForm({ initialData, isEdit, isAdmin = false }: BeritaFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        judul: initialData?.judul || '',
        kategori: initialData?.kategori || 'Berita',
        konten: initialData?.konten || '',
        gambar_url: initialData?.gambar_url || '',
        tags: initialData?.tags?.join(', ') || '',
        status: initialData?.status || (isAdmin ? 'published' : 'pending'),
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('file', file);
        
        setUploading(true);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Upload failed');
            }

            const data = await res.json();
            setFormData(prev => ({ ...prev, gambar_url: data.url }));
            toast.success('Gambar berhasil diupload');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = isEdit ? `/api/berita/${initialData._id}` : '/api/berita';
            const method = isEdit ? 'PUT' : 'POST';

            let statusToSend = formData.status;
            // Admin logic: Published -> Approved
            if (isAdmin && statusToSend === 'published') statusToSend = 'approved';
            
            // Non-Admin logic: Always pending or draft (if user chose draft feature? currently no draft UI for user if hidden).
            // If hidden, default to pending.
            if (!isAdmin) statusToSend = 'pending';

            const payload = {
                ...formData,
                status: statusToSend
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Gagal menyimpan berita');
            }

            toast.success(isEdit ? 'Berita diperbarui' : 'Berita berhasil dibuat');
            router.push('/admin/berita');
            router.refresh();

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow border border-gray-200 p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {isEdit ? 'Edit Berita' : 'Tambah Berita Baru'}
                </h2>
                <Link href="/admin/berita" className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200 transition">
                    <FaArrowLeft /> Kembali
                </Link>
            </div>

            <div className="space-y-6">
                {/* Judul */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita</label>
                    <input 
                        type="text" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan judul berita..."
                        value={formData.judul}
                        onChange={e => setFormData({...formData, judul: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kategori */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <select 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={formData.kategori}
                            onChange={e => setFormData({...formData, kategori: e.target.value})}
                        >
                            <option value="Berita">Berita</option>
                            <option value="Kegiatan">Kegiatan</option>
                            <option value="Artikel">Artikel</option>
                            <option value="Pengumuman">Pengumuman</option>
                            <option value="Prestasi">Prestasi</option>
                            <option value="Karir">Karir & Bisnis</option>
                            <option value="Opini">Opini</option>
                            <option value="Edukasi">Edukasi</option>
                            <option value="Kenangan">Kenangan</option>
                        </select>
                    </div>

                    {/* Status - Only for Admin */}
                    {isAdmin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="draft">Draft</option>
                                <option value="pending">Pending Review</option>
                                <option value="approved">Published (Approved)</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Gambar URL & Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Utama</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative">
                        {formData.gambar_url ? (
                            <div className="relative w-full">
                                <img src={formData.gambar_url} alt="Preview" className="max-h-64 object-contain mx-auto rounded shadow-sm" />
                                <button 
                                    type="button" 
                                    onClick={() => setFormData({...formData, gambar_url: ''})}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow"
                                    title="Hapus Gambar"
                                >
                                    <FaImage />
                                </button>
                            </div>
                        ) : (
                            <>
                                <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                                <p className="text-gray-500 text-sm mb-2 font-medium">Klik untuk upload atau drag & drop</p>
                                <p className="text-xs text-gray-400 mb-4">SVG, PNG, JPG or GIF</p>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    disabled={uploading}
                                />
                            </>
                        )}
                        {uploading && (
                             <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                <span className="text-blue-600 font-bold animate-pulse">Uploading...</span>
                             </div>
                        )}
                    </div>
                    
                    {/* Fallback URL Input (Optional but requested context initially implied replacing URL field, but retaining it as backup is good UX) */}
                     <div className="mt-2 text-xs text-gray-500 flex justify-end">
                        <button type="button" onClick={() => {
                             const url = prompt("Masukkan URL Manual:", formData.gambar_url);
                             if (url !== null) setFormData({...formData, gambar_url: url});
                        }} className="hover:underline">Input Manual URL</button>
                    </div>
                </div>

                {/* Konten */}
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita / Artikel</label>
                     <textarea 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[300px]"
                        placeholder="Tulis konten berita di sini..."
                        value={formData.konten}
                        onChange={e => setFormData({...formData, konten: e.target.value})}
                     />
                </div>
                
                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (Pisahkan dengan koma)</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Contoh: reuni, sekolah, prestasi"
                        value={formData.tags}
                        onChange={e => setFormData({...formData, tags: e.target.value})}
                    />
                </div>

                <div className="pt-4 border-t flex justify-end gap-3">
                     <Link href="/admin/berita" className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
                        Batal
                    </Link>
                    <button 
                        type="submit" 
                        disabled={isLoading || uploading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        <FaSave />
                        {isLoading ? 'Menyimpan...' : 'Simpan Berita'}
                    </button>
                </div>
            </div>
        </form>
    );
}
