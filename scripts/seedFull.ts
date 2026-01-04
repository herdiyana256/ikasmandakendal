
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Berita from "../models/Berita";
import Agenda from "../models/Agenda";
import Donasi from "../models/Donasi";
import LapakAlumni from "../models/LapakAlumni";
import LowonganKerja from "../models/LowonganKerja";
import User from "../models/User";

// Load env vars
dotenv.config({ path: ".env.local" });

// Image Assets
const schoolImages = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
];

const eventImages = [
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
];

const businessImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-415105080036?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556740758-90de2742e1e2?q=80&w=2070&auto=format&fit=crop"
];

// --- DATA ---
const beritaData = [
  { judul: "Siswa SMA 1 Kendal Raih Medali Emas OSN 2024", konten: "Tim Olimpiade Sains berhasil membawa pulang Medali Emas dalam ajang OSN tingkat nasional.", kategori: "Prestasi", penulis: "Humas", published_at: new Date("2024-05-15"), slug: "emas-osn-2024", gambar_url: schoolImages[0] },
  { judul: "Workshop Robotik Bersama Alumni ITB", konten: "Alumni yang berkuliah di ITB memberikan pelatihan dasar robotika kepada siswa kelas X dan XI.", kategori: "Kegiatan", penulis: "Klub Robotik", published_at: new Date("2024-04-20"), slug: "workshop-robotik", gambar_url: schoolImages[3] },
  { judul: "Peringatan Hari Kartini: Lomba Kebaya & Pidato", konten: "Memperingati hari Kartini dengan semangat emansipasi dan budaya, sekolah mengadakan lomba fashion show kebaya.", kategori: "Kegiatan", penulis: "OSIS", published_at: new Date("2024-04-21"), slug: "hari-kartini-2024", gambar_url: eventImages[0] },
  { judul: "Kunjungan Studi Banding dari SMA 3 Semarang", konten: "Menerima kunjungan persahabatan untuk bertukar ide mengenai pengelolaan organisasi siswa.", kategori: "Kunjungan", penulis: "Humas", published_at: new Date("2024-03-10"), slug: "studi-banding-sma3", gambar_url: schoolImages[1] },
  { judul: "Renovasi Masjid Sekolah Rampung 100%", konten: "Berkat bantuan alumni dan donatur, renovasi masjid sekolah kini telah selesai dan siap digunakan.", kategori: "Fasilitas", penulis: "Sarpras", published_at: new Date("2024-02-28"), slug: "renovasi-masjid-selesai", gambar_url: schoolImages[2] },
];

const kolomAlumniData = [
  { judul: "Meniti Karir di Silicon Valley: Sebuah Catatan", konten: "Perjalananku dari Kendal hingga ke pusat teknologi dunia bukanlah jalan yang mulus. Banyak rintangan...", kategori: "Karir & Bisnis", penulis: "Andi Saputra '08", published_at: new Date("2024-05-01"), slug: "karir-silicon-valley", gambar_url: businessImages[1] },
  { judul: "Pentingnya Soft Skill di Era AI", konten: "Di tengah gempuran kecerdasan buatan, kemampuan interpersonal dan empati justru menjadi nilai jual utama...", kategori: "Opini", penulis: "Sari Wulandari '10", published_at: new Date("2024-04-15"), slug: "soft-skill-ai", gambar_url: businessImages[2] },
  { judul: "Nostalgia Kantin Mbok Darmi", konten: "Siapa yang tidak rindu dengan nasi pecel legendaris Mbok Darmi? Mari kita bernostalgia sejenak...", kategori: "Kenangan", penulis: "Budi Santoso '95", published_at: new Date("2024-03-20"), slug: "nostalgia-kantin", gambar_url: eventImages[2] },
  { judul: "Tips Mengelola Keuangan untuk Gen Z", konten: "Generasi Z sering dianggap boros, padahal dengan strategi yang tepat, kita bisa mencapai kebebasan finansial...", kategori: "Edukasi", penulis: "Rina Keuangan '15", published_at: new Date("2024-02-10"), slug: "tips-keuangan-genz", gambar_url: businessImages[3] },
];

const agendaData = [
  { title: "Reuni Akbar Lintas Angkatan", date: new Date("2025-08-17"), description: "Temu kangen seluruh angkatan di Halaman SMA 1 Kendal.", location: "SMA 1 Kendal", category: "Reuni" },
  { title: "Webinar: Peluang Bisnis Digital", date: new Date("2024-07-10"), description: "Belajar bisnis online bersama pakar alumni.", location: "Zoom Meeting", category: "Webinar" },
  { title: "Donor Darah Rutin", date: new Date("2024-06-15"), description: "Setetes darah anda, nyawa bagi sesama.", location: "Aula Sekolah", category: "Sosial" },
  { title: "Fun Bike & Car Free Day", date: new Date("2024-09-09"), description: "Olahraga pagi bersama keliling kota Kendal.", location: "Alun-alun Kendal", category: "Olahraga" },
];

const lapakData = [
  { nama_usaha: "Kendal Kopi Roastery", deskripsi: "Biji kopi pilihan asli Kendal, diroasting dengan hati.", kategori: "Kuliner", lokasi: "Kendal Kota", kontak: "08123456789", images: [businessImages[0]] },
  { nama_usaha: "Batik Cantik SMANDA", deskripsi: "Batik tulis dan cap dengan motif khas Kendal.", kategori: "Fashion", lokasi: "Kaliwungu", kontak: "08123456788", images: [businessImages[1]] },
  { nama_usaha: "Jasa Desain Arsitek", deskripsi: "Konsultan arsitektur dan interior berpengalaman.", kategori: "Jasa", lokasi: "Semarang", kontak: "08123456787", images: [businessImages[2]] },
  { nama_usaha: "Catering Berkah", deskripsi: "Nasi kotak dan prasmanan untuk segala acara.", kategori: "Kuliner", lokasi: "Weleri", kontak: "08123456786", images: [businessImages[3]] },
  { nama_usaha: "Percetakan Maju Jaya", deskripsi: "Cetak undangan, brosur, banner murah dan cepat.", kategori: "Jasa", lokasi: "Kendal Kota", kontak: "08123456785", images: [businessImages[1]] },
];

const lokerData = [
   { title: "Senior Web Developer", company: "Tech Indo Sejahtera", location: "Remote / Jakarta", type: "Full Time", description: "Dicari developer React/Next.js berpengalaman 3+ tahun.", posted_at: new Date() },
   { title: "Staff Akuntansi", company: "CV Maju Mundur", location: "Kendal", type: "Full Time", description: "Lulusan S1 Akuntansi, menguasai MYOB/Accurate.", posted_at: new Date() },
   { title: "Digital Marketing Specialist", company: "StartUp Karya", location: "Semarang", type: "Contract", description: "Jago FB Ads & Google Ads.", posted_at: new Date() },
   { title: "HRD Manager", company: "PT Industri Kendal", location: "KIK Kendal", type: "Full Time", description: "Pengalaman min 5 tahun di manufaktur.", posted_at: new Date() },
];

const donasiData = [
    { title: "Beasiswa Anak Asuh Alumni", description: "Bantu biaya pendidikan 50 siswa kurang mampu berprestasi.", target_amount: 100000000, current_amount: 45000000, deadline: new Date("2024-12-31"), status: 'active', image_url: schoolImages[0] },
    { title: "Renovasi Perpustakaan Digital", description: "Modernisasi perpustakaan sekolah dengan perangkat komputer baru.", target_amount: 75000000, current_amount: 12500000, deadline: new Date("2024-10-20"), status: 'active', image_url: schoolImages[1] },
    { title: "Bantuan Bencana Banjir", description: "Donasi darurat untuk korban banjir di wilayah Kendal Bawah.", target_amount: 50000000, current_amount: 48000000, deadline: new Date("2024-06-30"), status: 'active', image_url: eventImages[1] },
];

async function seedFull() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
      console.error("❌ MONGODB_URI is not defined");
      process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  console.log("✅ Connected!");

  try {
     // 0. Ensure Admin User exists
     console.log("Checking for admin user...");
     const adminEmail = "admin@ikasmandakendal.or.id";
     let admin = await User.findOne({ email: adminEmail });
     if (!admin) {
       console.log("Creating Seed Admin...");
       const hashedPassword = await bcrypt.hash("admin123", 10);
       admin = await User.create({
         username: "admin_seed",
         email: adminEmail,
         password: hashedPassword,
         nama_depan: "Admin",
         nama_belakang: "IKASMANDA",
         role: "admin",
         is_verified: true
       });
       console.log("✅ Admin created.");
     } else {
       console.log("✅ Admin found.");
     }

     // 1. BERITA
     console.log("Seeding Berita...");
     await Berita.deleteMany({});
     const allArticles = [...beritaData, ...kolomAlumniData].map(a => ({...a, tags: ['Seeded', a.kategori], status: 'approved'}));
     await Berita.insertMany(allArticles);
     console.log("✅ Berita & Kolom Alumni seeded.");

     // 2. AGENDA
     console.log("Seeding Agenda...");
     await Agenda.deleteMany({});
     await Agenda.insertMany(agendaData.map(a => ({
         judul: a.title,
         deskripsi: a.description,
         tanggal_mulai: a.date,
         lokasi: a.location,
         created_by: admin?._id
     })));
     console.log("✅ Agenda seeded.");

     // 3. LAPAK
     console.log("Seeding Lapak...");
     await LapakAlumni.deleteMany({});
     await LapakAlumni.insertMany(lapakData.map(l => ({
         user_id: admin?._id,
         nama_usaha: l.nama_usaha,
         deskripsi: l.deskripsi,
         kategori: l.kategori,
         alamat: l.lokasi,
         no_telepon: l.kontak,
         gambar_url: l.images[0],
         status: 'approved',
         approved_by: admin?._id,
         approved_at: new Date()
     })));
     console.log("✅ Lapak Alumni seeded.");

     // 4. LOKER
     console.log("Seeding Loker...");
     await LowonganKerja.deleteMany({});
     await LowonganKerja.insertMany(lokerData.map(l => ({
         judul: l.title,
         perusahaan: l.company,
         lokasi: l.location,
         tipe_pekerjaan: l.type,
         deskripsi: l.description,
         posted_by: admin?._id,
         status: 'active',
         contact_email: 'hrd@company.com'
     })));
     console.log("✅ Info Loker seeded.");

     // 5. DONASI
     console.log("Seeding Donasi...");
     await Donasi.deleteMany({});
     await Donasi.insertMany(donasiData.map(d => ({
         nama_campaign: d.title,
         deskripsi: d.description,
         target_amount: d.target_amount,
         current_amount: d.current_amount,
         deadline: d.deadline,
         status: 'active',
         gambar_url: d.image_url
     })));
     console.log("✅ Donasi Campaigns seeded.");

     console.log("🎉 All data seeded successfully!");
  } catch (error: any) {
     console.error("❌ Error seeding:");
     if (error.name === 'ValidationError') {
         console.error(JSON.stringify(error.errors, null, 2));
     } else {
         console.error(error);
     }
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
  process.exit(0);
}

seedFull();
