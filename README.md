# IKASMANDA KENDAL Web Portal 🌐

**Portal Resmi Ikatan Alumni SMAN 1 Kendal** - Platform digital terintegrasi untuk menghubungkan ribuan alumni, memfasilitasi donasi, lowongan kerja, berita, dan kegiatan komunitas.

## ✨ Fitur Unggulan

### 1. Portal Berita & Informasi 📰
*   **Headline & Ticker**: Berita terbaru dan pengumuman berjalan (News Ticker) Real-time.
*   **Kategori**: Berita Sekolah, Kegiatan Alumni, dan Artikel Opini.
*   **Kontribusi**: Alumni terdaftar dapat menulis dan mengirimkan artikel (menunggu persetujuan Admin).

### 2. Direktori & Jejaring Alumni 🤝
*   **Pencarian Alumni**: Temukan teman seangkatan berdasarkan Tahun Lulus, Pekerjaan, atau Domisili.
*   **Profil Profesional**: Setiap alumni memiliki profil publik untuk networking.
*   **Peta Sebaran**: (Coming Soon) Visualisasi lokasi alumni.

### 3. Informasi Lowongan Kerja (Info Loker) 💼
*   **Job Board**: Tampilan modern ala Jobstreet/LinkedIn.
*   **Filter Canggih**: Cari berdasarkan Lokasi, Posisi, atau Tipe Pekerjaan.
*   **Submit Loker**: Alumni dapat memposting lowongan kerja untuk sesama alumni.

### 4. Donasi & Filantropi ❤️
*   **Campaign Resmi**: Beasiswa, Bantuan Bencana, dan Pembangunan Sekolah.
*   **Transparansi**: Indikator progress bar dana terkumpul dan jumlah donatur real-time.
*   **Rekening Resmi**: Informasi transfer langsung ke rekening organisasi.

### 5. Agenda & Kegiatan 📅
*   **Kalender Event**: Reuni Akbar, Webinar, dan Bakti Sosial.
*   **Countdown & RSVP**: Info detail waktu pelaksanaan dan pendaftaran.

### 6. Lapak Alumni (Marketplace) 🏪
*   **Promosi Usaha**: Alumni dapat mempromosikan bisnis atau jasa mereka.
*   **Katalog Produk**: Daftar lengkap usaha milik alumni untuk saling dukung (Beli di Teman Sendiri).

### 7. Admin Dashboard (CMS) 🛠️
*   **Manajemen User**: Verifikasi dan kelola data anggota.
*   **Approval System**: Moderasi Berita, Loker, dan Lapak sebelum tayang.
*   **Laporan**: Rekapitulasi data dan log aktivitas.

---

## 🚀 Tech Stack

Project ini dibangun menggunakan teknologi web modern untuk performa tinggi, keamanan, dan *developer experience* terbaik:

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (dengan Mongoose ODM)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
*   **Deployment**: Vercel Ready

---

## 🛠️ Instalasi & Setup

Ikuti langkah berikut untuk menjalankan project di komputer lokal Anda:

### 1. Clone Repository
```bash
git clone https://github.com/herdiyana256/ikasmandakendal.git
cd ikasmandakendal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env.local` di root folder dan isi dengan konfigurasi berikut:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ikasmandakendal

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=rahasia_super_secure_bisa_generate_sendiri

# (Opsional) API Keys lain jika diperlukan
```

### 4. Seed Database (Data Dummy)
Isi database dengan data awal (User Admin, Berita Contoh, dll):
```bash
# Isi data user, berita, loker, dll
node lib/seed_users.js
node lib/seed_donasi.js
node lib/seed_loker.js
node lib/seed_agenda.js
```
*Catatan: Pastikan MongoDB lokal sudah berjalan.*

### 5. Jalankan Server Development
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 📂 Struktur Project

```
ikasmandakendal/
├── app/                  # Route Pages (Next.js App Router)
│   ├── (auth)/           # Halaman Login/Register
│   ├── admin/            # Dashboard Admin
│   ├── alumni/           # Dashboard User/Alumni
│   ├── api/              # API Endpoints
│   ├── berita/           # Halaman Berita
│   ├── donasi/           # Halaman Donasi
│   ├── info-loker/       # Halaman Info Loker
│   └── ...
├── components/           # Reusable UI Components
│   ├── admin/            # Komponen khusus Admin
│   ├── ui/               # Basic UI (Button, Card, Input)
│   └── ...
├── lib/                  # Utility Functions & DB Connection
├── models/               # Mongoose Schema Definitions
├── public/               # Static Assets (Images, Icons)
└── styles/               # Global CSS
```

---

## 👥 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin memperbaiki bug atau menambah fitur:

1.  Fork repository ini.
2.  Buat branch fitur baru (`git checkout -b fitur-keren`).
3.  Commit perubahan Anda (`git commit -m 'Menambah fitur keren'`).
4.  Push ke branch (`git push origin fitur-keren`).
5.  Buat Pull Request.

---

## 📄 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

---
&copy; 2026 IKASMANDA KENDAL. Developed by **Herdiyana**.
