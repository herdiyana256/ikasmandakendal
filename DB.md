# DATABASE GUIDE (MongoDB)

Dokumen ini menjelaskan cara mengakses, mengelola, dan memahami struktur database IKA SMANDA KENDAL.

---

## 1. Lokasi Database

Aplikasi menghubungkan database berdasarkan **Environment Variable** `MONGODB_URI` di file `.env`.

*   **Local Development**: `mongodb://localhost:27017/ikasmandakendal_dev`
*   **Production**: `mongodb+srv://...` (Atlas/VPS)

## 2. Cara Mengakses Database (GUI)
Gunakan **MongoDB Compass** atau **Atlas Data Explorer**.
Masukkan connection string dari `.env`.

## 3. Struktur Data (Schema)

| Collection Name | Deskripsi | Model File |
| :--- | :--- | :--- |
| **users** | Data akun. Password encrypted (bcrypt). | `models/User.ts` |
| **beritas** | Artikel berita & pengumuman. | `models/Berita.ts` |
| **agendas** | Event kalender. | `models/Agenda.ts` |
| **lowongankerjas** | Loker. | `models/LowonganKerja.ts` |
| **donasis** | Campaign donasi. | `models/Donasi.ts` |
| **organizations** | Singleton profil organisasi. | `models/Organization.ts` |

## 4. Backup & Restore
Gunakan `mongodump` dan `mongorestore` untuk backup data.
