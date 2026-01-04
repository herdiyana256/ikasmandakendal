"use client";

import { useState, useEffect } from 'react';
import { FaStore, FaSave, FaTimes, FaCloudUploadAlt, FaImage } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface LapakModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
    isLoading: boolean;
    isAdmin?: boolean;
}

export default function LapakModal({ isOpen, onClose, onSubmit, initialData, isLoading, isAdmin = false }: LapakModalProps) {
    const [formData, setFormData] = useState({
        nama_usaha: '',
        deskripsi: '',
        kategori: 'Makanan & Minuman',
        alamat: '',
        no_telepon: '',
        gambar_url: '',
        status: 'pending' // Default
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                nama_usaha: initialData.nama_usaha || '',
                deskripsi: initialData.deskripsi || '',
                kategori: initialData.kategori || 'Makanan & Minuman',
                alamat: initialData.alamat || '',
                no_telepon: initialData.no_telepon || '',
                gambar_url: initialData.gambar_url || '',
                status: initialData.status || 'pending'
            });
        } else {
            setFormData({
                nama_usaha: '',
                deskripsi: '',
                kategori: 'Makanan & Minuman',
                alamat: '',
                no_telepon: '',
                gambar_url: '',
                status: isAdmin ? 'approved' : 'pending'
            });
        }
    }, [initialData, isOpen, isAdmin]);

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

            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            setFormData(prev => ({ ...prev, gambar_url: data.url }));
            toast.success('Gambar berhasil diupload');
        } catch (error) {
            toast.error('Gagal upload gambar');
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaStore className="text-blue-600" />
                        {initialData ? 'Edit Lapak Usaha' : 'Tambah Lapak Baru'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <FaTimes size={24} />
                    </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha</label>
                            <input 
                                type="text" 
                                required 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={formData.nama_usaha}
                                onChange={e => setFormData({...formData, nama_usaha: e.target.value})}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                            <select 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                                value={formData.kategori}
                                onChange={e => setFormData({...formData, kategori: e.target.value})}
                            >
                                <option>Makanan & Minuman</option>
                                <option>Jasa / Service</option>
                                <option>Fashion</option>
                                <option>Kerajinan</option>
                                <option>Teknologi</option>
                                <option>Lainnya</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Usaha</label>
                        <textarea 
                            required 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                            value={formData.deskripsi}
                            onChange={e => setFormData({...formData, deskripsi: e.target.value})}
                        />
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat / Lokasi</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={formData.alamat}
                            onChange={e => setFormData({...formData, alamat: e.target.value})}
                            placeholder="Alamat lengkap usaha..."
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kontak (WhatsApp/Telp)</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={formData.no_telepon}
                            onChange={e => setFormData({...formData, no_telepon: e.target.value})}
                            placeholder="0812xxxx"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Foto Lapak / Produk</label>
                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative">
                            {formData.gambar_url ? (
                                <div className="relative w-full text-center">
                                    <img src={formData.gambar_url} alt="Preview" className="max-h-48 object-contain mx-auto rounded" />
                                    <button 
                                        type="button" 
                                        onClick={() => setFormData({...formData, gambar_url: ''})}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                                    <p className="text-gray-500 text-sm">Upload Foto (Max 2MB)</p>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        disabled={uploading}
                                    />
                                </>
                            )}
                             {uploading && <p className="text-blue-500 text-sm mt-2 font-bold animate-pulse">Uploading...</p>}
                         </div>
                    </div>

                    {isAdmin && (
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status (Admin Only)</label>
                            <select 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit" 
                            disabled={isLoading || uploading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold flex items-center gap-2"
                        >
                            <FaSave />
                            {isLoading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
