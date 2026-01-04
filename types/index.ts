export interface User {
  id: number;
  username: string;
  email: string;
  nama_depan: string;
  nama_belakang: string;
  role: 'user' | 'admin';
  is_verified: boolean;
  // Add other fields as needed
}

export interface Berita {
  id: number;
  judul: string;
  slug: string;
  konten: string;
  gambar_url?: string;
  kategori: string;
  penulis_id: number;
  views: number;
  published_at?: string;
  created_at: string;
}

export interface Agenda {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal_mulai: string;
  tanggal_selesai?: string;
  lokasi: string;
  gambar_url?: string;
}

export interface LowonganKerja {
  id: number;
  judul: string;
  perusahaan: string;
  lokasi: string;
  tipe_pekerjaan: string;
  gaji_min?: number;
  gaji_max?: number;
  deadline?: string;
}

export interface LapakAlumni {
  id: number;
  nama_usaha: string;
  deskripsi: string;
  kategori: string;
  alamat: string;
  gambar_url?: string;
  no_telepon?: string;
}

export interface Donasi {
  id: number;
  nama_campaign: string;
  target_amount: number;
  current_amount: number;
  gambar_url?: string;
  deadline?: string;
}
