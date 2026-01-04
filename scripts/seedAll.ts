import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import Berita from '../models/Berita';
import LapakAlumni from '../models/LapakAlumni';
import Donasi from '../models/Donasi';
import Agenda from '../models/Agenda';
import LowonganKerja from '../models/LowonganKerja';

// Load env vars
dotenv.config({ path: '.env.local' });

async function seedAll() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
      console.error('❌ MONGODB_URI is not defined in .env.local');
      process.exit(1);
  }

  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected.');

    // 1. Seed Admin & Users
    console.log('👤 Seeding Users...');
    
    // Admin
    const adminEmail = 'admin@ikasmandakendal.or.id';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            username: 'admin',
            email: adminEmail,
            password: hashedPassword,
            nama_depan: 'Admin',
            nama_belakang: 'IKA SMANDA',
            role: 'admin',
            is_verified: true,
        });
        console.log('   ✅ Admin user created.');
    } else {
        console.log('   ℹ️ Admin user already exists.');
    }

    // Sample Alumni
    const alumniEmail = 'budi@alumni.com';
    let alumniId;
    const alumniExists = await User.findOne({ email: alumniEmail });
    if (!alumniExists) {
        const hashedPassword = await bcrypt.hash('alumni123', 10);
        const newAlumni = await User.create({
            username: 'budisantoso',
            email: alumniEmail,
            password: hashedPassword,
            nama_depan: 'Budi',
            nama_belakang: 'Santoso',
            angkatan: '2010',
            status_pekerjaan: 'Wiraswasta',
            nama_perusahaan: 'Kopi Kenangan Mantan',
            role: 'alumni',
            is_verified: true,
        });
        alumniId = newAlumni._id;
        console.log('   ✅ Sample Alumni user created.');
    } else {
        alumniId = alumniExists._id;
        console.log('   ℹ️ Sample Alumni user already exists.');
    }

    // 2. Seed Berita
    console.log('📰 Seeding Berita...');
    if (await Berita.countDocuments() === 0) {
        await Berita.create([
            {
                judul: 'Reuni Akbar 2026 Segera Digelar',
                slug: 'reuni-akbar-2026',
                konten: 'Persiapan reuni akbar sudah mencapai 80%, panitia mengundang seluruh angkatan untuk hadir di SMA N 2 Kendal.',
                kategori: 'Kegiatan',
                status: 'approved',
                published_at: new Date(),
                penulis_id: alumniId // or admin
            },
            {
                judul: 'Profil Alumni Sukses: Budi Santoso',
                slug: 'profil-budi-santoso',
                konten: 'Kisah inspiratif Budi Santoso membangun startup teknologi di Jakarta yang kini telah memiliki 100 karyawan.',
                kategori: 'Profil',
                status: 'approved',
                published_at: new Date(),
            }
        ]);
        console.log('   ✅ Sample Berita created.');
    }

    // 3. Seed Lapak Alumni
    console.log('🏪 Seeding Lapak Alumni...');
    if (await LapakAlumni.countDocuments() === 0 && alumniId) {
        await LapakAlumni.create({
            user_id: alumniId,
            nama_usaha: 'Kopi Kenangan Mantan',
            kategori: 'Kuliner',
            deskripsi: 'Menyediakan aneka kopi nusantara dengan cita rasa kekinian.',
            alamat: 'Jl. Pemuda No. 45, Kendal',
            no_telepon: '081234567890',
            status: 'approved'
        });
        console.log('   ✅ Sample Lapak created.');
    }

    // 4. Seed Donasi
    console.log('💖 Seeding Donasi...');
    if (await Donasi.countDocuments() === 0) {
        await Donasi.create({
            nama_campaign: 'Renovasi Masjid Sekolah',
            deskripsi: 'Bantuan dana untuk perbaikan atap masjid sekolah yang bocor.',
            target_amount: 50000000,
            current_amount: 12500000,
            status: 'active',
            deadline: new Date('2026-12-31')
        });
        console.log('   ✅ Sample Donasi created.');
    }

    // 5. Seed Agenda
    console.log('📅 Seeding Agenda...');
    if (await Agenda.countDocuments() === 0) {
        await Agenda.create({
            judul: 'Rapat Kerja Pengurus',
            deskripsi: 'Pembahasan program kerja tahun 2026.',
            tanggal_mulai: new Date('2026-02-10T09:00:00'),
            lokasi: 'Aula SMA N 2 Kendal'
        });
        console.log('   ✅ Sample Agenda created.');
    }

    // 6. Seed Loker
    console.log('💼 Seeding Lowongan Kerja...');
    if (await LowonganKerja.countDocuments() === 0) {
        await LowonganKerja.create({
            judul: 'Frontend Developer',
            perusahaan: 'Tech Solutions',
            deskripsi: 'Mencari frontend developer berpengalaman React/Next.js.',
            lokasi: 'Remote',
            tipe_pekerjaan: 'Full Time',
            gaji_min: 8000000,
            gaji_max: 12000000,
            status: 'active',
            posted_by: alumniId
        });
        console.log('   ✅ Sample Loker created.');
    }

    console.log('✨ Seed completed successfully!');
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedAll();
