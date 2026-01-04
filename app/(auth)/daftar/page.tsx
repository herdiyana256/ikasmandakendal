'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function RegisterPage() {
  /* import { toast } from 'react-hot-toast'; -- moved to top imports */
  
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    // Step 1: Personal
    nama_depan: '', nama_belakang: '', nama_panggilan: '',
    tempat_lahir: '', tanggal_lahir: '', jenis_kelamin: '', agama: '', golongan_darah: '', status_perkawinan: '',
    // Step 2: Alamat
    alamat_lengkap: '', kota: '', provinsi: '', kode_pos: '', no_telepon: '', no_hp: '',
    // Step 3: Pendidikan
    tahun_masuk_sma: '', tahun_lulus_sma: '', jurusan_sma: '',
    pendidikan_terakhir: '', universitas: '', jurusan_kuliah: '', tahun_lulus_kuliah: '',
    // Step 4: Pekerjaan
    status_pekerjaan: '', nama_perusahaan: '', jabatan: '', bidang_pekerjaan: '',
    // Step 5: Media Sosial
    facebook: '', instagram: '', linkedin: '', twitter: '',
    // Step 6: Info Alumni
    angkatan: '', kelas: '',
    // Step 7: Akun
    username: '', email: '', password: '', confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      toast.error('Password tidak cocok');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || data.error || 'Gagal mendaftar');
      }

      toast.success('Registrasi berhasil! Silahkan login.');
      router.push('/masuk?registered=true');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Terjadi kesalahan saat mendaftar');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informasi Personal</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input name="nama_depan" label="Nama Depan" value={formData.nama_depan} onChange={handleChange} required />
              <Input name="nama_belakang" label="Nama Belakang" value={formData.nama_belakang} onChange={handleChange} required />
            </div>
            <Input name="nama_panggilan" label="Nama Panggilan" value={formData.nama_panggilan} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <Input name="tempat_lahir" label="Tempat Lahir" value={formData.tempat_lahir} onChange={handleChange} />
              <Input name="tanggal_lahir" type="date" label="Tanggal Lahir" value={formData.tanggal_lahir} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                   <select name="jenis_kelamin" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={formData.jenis_kelamin} onChange={handleChange}>
                      <option value="">Pilih...</option>
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                   <select name="agama" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={formData.agama} onChange={handleChange}>
                      <option value="">Pilih...</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Budha">Budha</option>
                      <option value="Lainnya">Lainnya</option>
                   </select>
                </div>
            </div>
          </div>
        );
      case 2:
        return (
           <div className="space-y-4">
             <h3 className="text-lg font-medium">Alamat & Kontak</h3>
             <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
               <textarea name="alamat_lengkap" rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={formData.alamat_lengkap} onChange={handleChange} />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <Input name="kota" label="Kota/Kabupaten" value={formData.kota} onChange={handleChange} />
               <Input name="provinsi" label="Provinsi" value={formData.provinsi} onChange={handleChange} />
             </div>
             <Input name="kode_pos" label="Kode Pos" value={formData.kode_pos} onChange={handleChange} />
             <div className="grid grid-cols-2 gap-4">
               <Input name="no_telepon" label="No. Telepon Rumah" value={formData.no_telepon} onChange={handleChange} />
               <Input name="no_hp" label="No. HP / WhatsApp" value={formData.no_hp} onChange={handleChange} required />
             </div>
           </div>
        );
      case 3:
        return (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informasi Pendidikan</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input name="tahun_masuk_sma" type="number" label="Tahun Masuk SMA" value={formData.tahun_masuk_sma} onChange={handleChange} />
                <Input name="tahun_lulus_sma" type="number" label="Tahun Lulus SMA" value={formData.tahun_lulus_sma} onChange={handleChange} required />
              </div>
              <Input name="jurusan_sma" label="Jurusan SMA (IPA/IPS/Bahasa)" value={formData.jurusan_sma} onChange={handleChange} />
              <Input name="pendidikan_terakhir" label="Pendidikan Terakhir" value={formData.pendidikan_terakhir} onChange={handleChange} />
              <Input name="universitas" label="Universitas / Institusi" value={formData.universitas} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                 <Input name="jurusan_kuliah" label="Jurusan Kuliah" value={formData.jurusan_kuliah} onChange={handleChange} />
                 <Input name="tahun_lulus_kuliah" type="number" label="Tahun Lulus Kuliah" value={formData.tahun_lulus_kuliah} onChange={handleChange} />
              </div>
            </div>
        );
      case 4:
         return (
             <div className="space-y-4">
               <h3 className="text-lg font-medium">Informasi Pekerjaan</h3>
               <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Status Pekerjaan</label>
                   <select name="status_pekerjaan" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={formData.status_pekerjaan} onChange={handleChange}>
                      <option value="">Pilih...</option>
                      <option value="Bekerja">Bekerja</option>
                      <option value="Wiraswasta">Wiraswasta</option>
                      <option value="Belum Bekerja">Belum Bekerja</option>
                      <option value="Mahasiswa">Mahasiswa</option>
                      <option value="Lainnya">Lainnya</option>
                   </select>
               </div>
               {['Bekerja', 'Wiraswasta'].includes(formData.status_pekerjaan) && (
                 <>
                   <Input name="nama_perusahaan" label="Nama Perusahaan / Usaha" value={formData.nama_perusahaan} onChange={handleChange} />
                   <Input name="jabatan" label="Jabatan" value={formData.jabatan} onChange={handleChange} />
                   <Input name="bidang_pekerjaan" label="Bidang Pekerjaan" value={formData.bidang_pekerjaan} onChange={handleChange} />
                 </>
               )}
             </div>
         );
      case 5:
          return (
              <div className="space-y-4">
                  <h3 className="text-lg font-medium">Media Sosial</h3>
                  <Input name="facebook" label="Link Facebook" placeholder="https://facebook.com/username" value={formData.facebook} onChange={handleChange} />
                  <Input name="instagram" label="Link Instagram" placeholder="https://instagram.com/username" value={formData.instagram} onChange={handleChange} />
                  <Input name="linkedin" label="Link LinkedIn" placeholder="https://linkedin.com/in/username" value={formData.linkedin} onChange={handleChange} />
                  <Input name="twitter" label="Link Twitter/X" placeholder="https://twitter.com/username" value={formData.twitter} onChange={handleChange} />
              </div>
          );
      case 6:
          return (
              <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informasi Alumni</h3>
                  <div className="p-4 bg-blue-50 text-blue-700 text-sm rounded-md mb-4">
                      Angkatan biasanya disesuaikan dengan tahun lulus.
                  </div>
                  <Input name="angkatan" label="Angkatan (Tahun)" value={formData.angkatan} onChange={handleChange} required placeholder="Contoh: 2010" />
                  <Input name="kelas" label="Kelas Terakhir" value={formData.kelas} onChange={handleChange} placeholder="Contoh: XII IPA 1" />
              </div>
          );
      case 7:
          return (
              <div className="space-y-4">
                  <h3 className="text-lg font-medium">Akun Login</h3>
                  <Input name="username" label="Username" value={formData.username} onChange={handleChange} required />
                  <Input name="email" type="email" label="Email" value={formData.email} onChange={handleChange} required />
                  <Input name="password" type="password" label="Password" value={formData.password} onChange={handleChange} required />
                  <Input name="confirmPassword" type="password" label="Konfirmasi Password" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex justify-center">
      <div className="max-w-2xl w-full">
         <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Pendaftaran Alumni</h2>
            <p className="mt-2 text-sm text-gray-600">Lengkapi data diri Anda untuk bergabung.</p>
         </div>

         <div className="mb-8">
            <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                    <div key={s} className={`flex items-center ${s !== 7 ? 'flex-1' : ''}`}>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border-2 ${
                            step >= s ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-300'
                        }`}>
                            {s}
                        </div>
                        {s !== 7 && (
                            <div className={`flex-1 h-1 mx-2 ${
                                step > s ? 'bg-primary' : 'bg-gray-300'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500 px-1">
                <span>Personal</span>
                <span className="hidden sm:inline">Alamat</span>
                <span className="hidden sm:inline">Pendidikan</span>
                <span className="hidden sm:inline">Kerja</span>
                <span className="hidden sm:inline">Sosmed</span>
                <span className="hidden sm:inline">Alumni</span>
                <span>Akun</span>
            </div>
         </div>

         <Card className="p-8">
             <form onSubmit={handleSubmit}>
                 {error && (
                    <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm">
                        {error}
                    </div>
                 )}
                 
                 {renderStep()}

                 <div className="mt-8 flex justify-between">
                     {step > 1 ? (
                         <Button type="button" variant="secondary" onClick={prevStep}>
                             Sebelumnya
                         </Button>
                     ) : (
                         <div></div> 
                     )}

                     {step < 7 ? (
                         <Button type="button" onClick={nextStep}>
                             Selanjutnya
                         </Button>
                     ) : (
                         <Button type="submit" isLoading={isLoading}>
                             Daftar Sekarang
                         </Button>
                     )}
                 </div>
             </form>
         </Card>
      </div>
    </div>
  );
}
