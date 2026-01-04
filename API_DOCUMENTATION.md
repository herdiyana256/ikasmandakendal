# API DOCUMENTATION (IKA SMANDA KENDAL)

**Authentication:**
Sebagian besar endpoint `POST`, `PUT`, `DELETE` membutuhkan otentikasi via Session (NextAuth) atau **API Token Header**.

---

## 1. Authentication & Users
### Login
*   **URL:** `/api/auth/login` (Handled by NextAuth)
*   **Method:** `POST`

### Register
*   **URL:** `/api/register`
*   **Method:** `POST`
*   **Body:** `{ "username": "user", "email": "email@test.com", "password": "StrongPassword!1", ... }`

### Generate Token
*   **URL:** `/api/users/[id]/token`
*   **Method:** `POST`

### User CRUD
*   **Create:** `POST /api/users`
*   **Update:** `PUT /api/users/[id]`
*   **Delete:** `DELETE /api/users/[id]`

---

## 2. Admin & Approvals
*   **Manage Users:** `/api/admin/manage-user`
*   **Approve Berita:** `/api/admin/approve-berita`
*   **Approve Lapak:** `/api/admin/approve-lapak`
*   **Approve Donasi:** `/api/admin/approve-donasi`
*(Requires Admin/IT Role)*

---

## 3. Content Modules (Public/Alumni)

### Berita / Artikel
*   **Base URL:** `/api/berita`
*   **Ticker:** `/api/berita/ticker`
*   **GET**: List all (Public).
*   **POST**: Create (Alumni=Pending, Admin=Approved).
*   **PUT/DELETE**: `/api/berita/[id]`

### Lapak Alumni
*   **Base URL:** `/api/lapak`
*   **GET**: List Lapak.
*   **POST**: Create Lapak.
*   **PUT/DELETE**: `/api/lapak/[id]`

### Lowongan Kerja (Loker)
*   **Base URL:** `/api/loker`
*   **GET, POST**
*   **PUT/DELETE**: `/api/loker/[id]`

### Agenda
*   **Base URL:** `/api/agenda`
*   **GET, POST**
*   **PUT/DELETE**: `/api/agenda/[id]`

### Donasi
*   **Base URL:** `/api/donasi`
*   **GET, POST**
*   **PUT/DELETE**: `/api/donasi/[id]`

---

## 4. Utilities
### File Upload
*   **URL:** `/api/upload`
*   **Method:** `POST`
*   **Headers:** `Content-Type: multipart/form-data`

### Organization Structure
*   **URL:** `/api/organization`
*   **GET, POST, PUT, DELETE**

