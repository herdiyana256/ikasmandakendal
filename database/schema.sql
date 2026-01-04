CREATE DATABASE IF NOT EXISTS ikasmandakendal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ikasmandakendal;

-- Table: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    
    -- Informasi Personal
    nama_depan VARCHAR(100) NOT NULL,
    nama_belakang VARCHAR(100) NOT NULL,
    nama_panggilan VARCHAR(50),
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    jenis_kelamin ENUM('Laki-Laki', 'Perempuan'),
    agama ENUM('Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya'),
    golongan_darah ENUM('A', 'AB', 'B', 'O'),
    status_perkawinan ENUM('Sudah Berkeluarga', 'Belum Berkeluarga'),
    
    -- Alamat & Kontak
    alamat_lengkap TEXT,
    kota VARCHAR(100),
    provinsi VARCHAR(100),
    kode_pos VARCHAR(10),
    no_telepon VARCHAR(20),
    no_hp VARCHAR(20),
    
    -- Informasi Pendidikan
    tahun_masuk_sma INT,
    tahun_lulus_sma INT,
    jurusan_sma VARCHAR(50),
    pendidikan_terakhir VARCHAR(100),
    universitas VARCHAR(200),
    jurusan_kuliah VARCHAR(100),
    tahun_lulus_kuliah INT,
    
    -- Informasi Pekerjaan
    status_pekerjaan ENUM('Bekerja', 'Wiraswasta', 'Belum Bekerja', 'Mahasiswa', 'Lainnya'),
    nama_perusahaan VARCHAR(200),
    jabatan VARCHAR(100),
    bidang_pekerjaan VARCHAR(100),
    
    -- Media Sosial
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    linkedin VARCHAR(255),
    twitter VARCHAR(255),
    
    -- Info Alumni
    angkatan VARCHAR(10),
    kelas VARCHAR(20),
    
    -- Role & Status
    role ENUM('user', 'admin') DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_angkatan (angkatan),
    INDEX idx_tahun_lulus (tahun_lulus_sma),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: berita
CREATE TABLE berita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    konten TEXT NOT NULL,
    gambar_url VARCHAR(500),
    kategori VARCHAR(50),
    penulis_id INT,
    views INT DEFAULT 0,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (penulis_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: lapak_alumni
CREATE TABLE lapak_alumni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nama_usaha VARCHAR(200) NOT NULL,
    deskripsi TEXT,
    kategori VARCHAR(50),
    alamat TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    no_telepon VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    jam_operasional TEXT,
    gambar_url VARCHAR(500),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: donasi
CREATE TABLE donasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_campaign VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    target_amount DECIMAL(15, 2) NOT NULL,
    current_amount DECIMAL(15, 2) DEFAULT 0,
    gambar_url VARCHAR(500),
    status ENUM('active', 'completed', 'closed') DEFAULT 'active',
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: transaksi_donasi
CREATE TABLE transaksi_donasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donasi_id INT NOT NULL,
    user_id INT,
    nama_donatur VARCHAR(200) NOT NULL,
    email VARCHAR(255),
    amount DECIMAL(15, 2) NOT NULL,
    pesan TEXT,
    status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donasi_id) REFERENCES donasi(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: agenda
CREATE TABLE agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    tanggal_mulai DATETIME NOT NULL,
    tanggal_selesai DATETIME,
    lokasi VARCHAR(255),
    gambar_url VARCHAR(500),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: lowongan_kerja
CREATE TABLE lowongan_kerja (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    perusahaan VARCHAR(200) NOT NULL,
    deskripsi TEXT,
    lokasi VARCHAR(255),
    tipe_pekerjaan ENUM('Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'),
    gaji_min DECIMAL(15, 2),
    gaji_max DECIMAL(15, 2),
    requirements TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    deadline DATE,
    posted_by INT,
    status ENUM('active', 'closed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
