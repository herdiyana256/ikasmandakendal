import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  
  // Informasi Personal
  nama_depan: string;
  nama_belakang: string;
  nama_panggilan?: string;
  tempat_lahir?: string;
  tanggal_lahir?: Date;
  foto_profil?: string;
  jenis_kelamin?: 'Laki-Laki' | 'Perempuan';
  agama?: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Budha' | 'Konghucu' | 'Lainnya';
  golongan_darah?: 'A' | 'AB' | 'B' | 'O';
  status_perkawinan?: 'Sudah Berkeluarga' | 'Belum Berkeluarga';
  
  // Alamat & Kontak
  alamat_lengkap?: string;
  kota?: string;
  provinsi?: string;
  kode_pos?: string;
  no_telepon?: string;
  no_hp?: string;
  
  // Informasi Pendidikan
  tahun_masuk_sma?: number;
  tahun_lulus_sma?: number;
  jurusan_sma?: string;
  pendidikan_terakhir?: string;
  universitas?: string;
  jurusan_kuliah?: string;
  tahun_lulus_kuliah?: number;
  
  // Informasi Pekerjaan
  status_pekerjaan?: 'Bekerja' | 'Wiraswasta' | 'Belum Bekerja' | 'Mahasiswa' | 'Lainnya';
  nama_perusahaan?: string;
  jabatan?: string;
  bidang_pekerjaan?: string;
  
  // Media Sosial
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  
  // Info Alumni
  angkatan?: string;
  kelas?: string;
  
  // Role & Status
  role: 'user' | 'admin' | 'alumni' | 'IT';
  is_verified: boolean;
  
  createdAt: Date;
  updatedAt: Date;
  api_token?: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    nama_depan: { type: String, required: true },
    nama_belakang: { type: String, required: true },
    nama_panggilan: String,
    tempat_lahir: String,
    tanggal_lahir: Date,
    foto_profil: String,
    jenis_kelamin: { type: String, enum: ['Laki-Laki', 'Perempuan'] },
    agama: { type: String, enum: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya'] },
    golongan_darah: { type: String, enum: ['A', 'AB', 'B', 'O'] },
    status_perkawinan: { type: String, enum: ['Sudah Berkeluarga', 'Belum Berkeluarga'] },
    
    alamat_lengkap: String,
    kota: String,
    provinsi: String,
    kode_pos: String,
    no_telepon: String,
    no_hp: String,
    
    tahun_masuk_sma: Number,
    tahun_lulus_sma: Number,
    jurusan_sma: String,
    pendidikan_terakhir: String,
    universitas: String,
    jurusan_kuliah: String,
    tahun_lulus_kuliah: Number,
    
    status_pekerjaan: { type: String, enum: ['Bekerja', 'Wiraswasta', 'Belum Bekerja', 'Mahasiswa', 'Lainnya'] },
    nama_perusahaan: String,
    jabatan: String,
    bidang_pekerjaan: String,
    
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
    
    angkatan: String,
    kelas: String,
    
    role: { type: String, enum: ['admin', 'alumni', 'IT'], default: 'alumni' },
    is_verified: { type: Boolean, default: false },
    api_token: { type: String, unique: true, sparse: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ angkatan: 1 });
UserSchema.index({ tahun_lulus_sma: 1 });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
