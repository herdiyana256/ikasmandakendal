# ACCOUNT & API TESTING GUIDE

## Dummy Accounts (For Testing)

Gunakan akun-akun berikut untuk pengujian (Development/Testing Environment).
**PERINGATAN**: Jangan gunakan password ini di Production!

| Role | Username | Email | Password | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin (IT)** | `superadmin` | `it@ikasmandakendal.com` | `Admin#1234` | Verified |
| **Admin (Pengurus)** | `admin_umum` | `admin@ikasmandakendal.com` | `Admin#1234` | Verified |
| **Alumni (User)** | `alumni01` | `alumni@test.com` | `User#1234` | Verified |
| **User Baru** | `newuser` | `new@test.com` | `User#1234` | Unverified |

---

## Tutorial Testing API (Postman / cURL)

Berikut adalah panduan untuk melakukan testing endpoint registrasi dan login.

### 1. Registrasi User Baru
Test validasi ketat (Email valid & Password kuat).

**Endpoint:** `POST http://localhost:3000/api/register`
**Headers:** `Content-Type: application/json`

**Body (JSON - Valid):**
```json
{
  "username": "budi_santoso",
  "email": "budi.santoso@email.com",
  "password": "PasswordStrong!1",
  "nama_depan": "Budi",
  "nama_belakang": "Santoso"
}
```

### 2. Login
**Endpoint:** `POST http://localhost:3000/api/auth/login` (NextAuth default).

---

## Role & Hak Akses

1.  **IT (Super Admin)**: Akses penuh, bisa generate API Token.
2.  **Admin**: Manajemen Konten, Approval Lapak/Loker.
3.  **Alumni**: Posting Loker (Pending/Auto), Lihat Direktori.
