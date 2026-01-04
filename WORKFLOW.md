# WORKFLOW & BUSINESS LOGIC
**Developed by Mas Adam**

Dokumen ini menjelaskan alur kerja sistem (Business Flow) untuk setiap role pengguna dalam ekosistem IKA SMANDA KENDAL.

---

## 1. User Registration Flow (Pendaftaran)

**Aktor:** User Baru (Alumni)

1.  **Input Data Awal:**
    -   User mengisi form registrasi (Username, Email, Password, Nama).
    -   **Validasi Sistem:**
        -   Email harus format valid (user@domain.com).
        -   Password wajib: Min 8 karakter, 1 Huruf Besar, 1 Angka, 1 Simbol.
        -   Username & Email harus unik.
2.  **Verifikasi Email (Optional/Next Phase):**
    -   Sistem mengirim link aktivasi ke email.
3.  **Lengkapi Profil (Onboarding):**
    -   Setelah login pertama, user diarahkan mengisi:
        -   Tahun Masuk & Lulus (Validasi Angkatan).
        -   Pekerjaan & Kontak.
        -   Alamat Domisili.
4.  **Menunggu Verifikasi Admin:**
    -   Status akun: `Unverified` -> `Pending`.
    -   User belum bisa akses Direktori Alumni penuh.
5.  **Approval:**
    -   Admin memverifikasi data (cross-check database sekolah jika ada).
    -   Status: `Verified`. User mendapat notifikasi.

---

## 2. Content Management Flow (Manajemen Konten)

**Aktor:** Admin (Pengurus), IT

### Berita & Artikel
1.  **Drafting:** Admin membuat berita baru, upload gambar, set kategori. Status default: `Draft`.
2.  **Publishing:** Admin mengubah status menjadi `Published`.
    -   Sistem mencatat `published_at` timestamp.
    -   Konten muncul di Homepage dan Halaman Berita.

## 3. Alumni Contribution Flow (Lapak & Loker)

**Aktor:** Alumni (Verified)

### Posting Lowongan Kerja (Loker)
1.  **Submission:** Alumni mengisi form Loker.
2.  **Auto-Publish (Trusted) or Moderation:**
    -   *Config:* Saat ini set `Active` (Auto-Publish) untuk Alumni Verified.
    -   Jika user unverified, status `Pending`.
3.  **Management:** Pembuat bisa mengedit atau menutup lowongan (`Closed`).

### Lapak Alumni (Marketplace)
1.  **Listing:** Alumni upload produk/jasa.
2.  **Approval:** Wajib Approval Admin.
