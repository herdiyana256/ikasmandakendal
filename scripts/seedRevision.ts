
import mongoose from "mongoose";
import Berita from "@/models/Berita";
import connectDB from "@/lib/db";

// Image collections for variety
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

const achievementImages = [
    "https://images.unsplash.com/photo-1567168544230-d5a94bd12e75?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
];

const articles = [
  {
    judul: "Siswa SMA 1 Kendal Raih Medali Emas Olimpiade Sains Nasional 2024",
    konten: "Prestasi membanggakan kembali ditorehkan oleh siswa SMA Negeri 1 Kendal. Tim Olimpiade Sains berhasil membawa pulang Medali Emas dalam ajang OSN tingkat nasional yang diselenggarakan di Jakarta pekan lalu. Kepala Sekolah menyatakan rasa bangganya atas kerja keras siswa dan pembimbing. 'Ini adalah bukti bahwa siswa kita mampu bersaing di tingkat nasional,' ujarnya.",
    kategori: "Prestasi",
    penulis: "Humas Sekolah",
    published_at: new Date("2024-05-15"),
    tags: ["OSN", "Prestasi", "Akademik"],
    slug: "siswa-sman1-raih-emas-osn-2024",
    status: "approved",
    gambar_url: achievementImages[0]
  },
  {
    judul: "Reuni Akbar Lintas Angkatan: Menjalin Sinergi, Membangun Negeri",
    konten: "Ribuan alumni dari angkatan 1980 hingga 2023 memadati halaman sekolah dalam acara Reuni Akbar IKASMAN1K. Acara yang mengusung tema 'Kembali Pulang' ini dimeriahkan dengan jalan sehat, bazar UMKM alumni, dan panggung hiburan. Ketua Panitia berharap acara ini dapat mempererat tali silaturahmi dan membuka peluang kolaborasi antar alumni untuk kemajuan daerah.",
    kategori: "Kegiatan",
    penulis: "Panitia Reuni",
    published_at: new Date("2024-04-20"),
    tags: ["Reuni", "Alumni", "Event"],
    slug: "reuni-akbar-lintas-angkatan",
    status: "approved",
    gambar_url: eventImages[0]
  },
  {
    judul: "IKASMAN1K Salurkan Beasiswa Pendidikan untuk 50 Siswa Berprestasi",
    konten: "Sebagai bentuk kepedulian terhadap almamater, Pengurus Pusat IKA SMANDA KENDAL menyalurkan beasiswa pendidikan kepada 50 siswa-siswi berprestasi namun kurang mampu. Program beasiswa ini merupakan hasil donasi dari para alumni yang tergabung dalam program 'Alumni Peduli'.",
    kategori: "Kabar Sosial",
    penulis: "Dept. Sosial",
    published_at: new Date("2024-03-10"),
    tags: ["Beasiswa", "Sosial", "Pendidikan"],
    slug: "ikasman1k-salurkan-beasiswa",
    status: "approved",
    gambar_url: schoolImages[0]
  },
  {
    judul: "Kunjungan Industri ke Jakarta: Mengenal Dunia Kerja Digital",
    konten: "Sebanyak 100 siswa kelas XI mengikuti kegiatan Kunjungan Industri ke beberapa perusahaan teknologi ternama di Jakarta. Kegiatan ini bertujuan untuk memberikan wawasan langsung mengenai dunia kerja di era digital dan memotivasi siswa untuk terus mengembangkan skill teknologi mereka.",
    kategori: "Kegiatan",
    penulis: "Humas Sekolah",
    published_at: new Date("2024-02-28"),
    tags: ["Kunjungan Industri", "Edukasi", "Teknologi"],
    slug: "kunjungan-industri-jakarta",
    status: "approved",
    gambar_url: eventImages[1]
  },
  {
    judul: "Tim Futsal Alumni Juara 1 Turnamen Antar Ikatan Alumni se-Jateng",
    konten: "Tim Futsal IKASMAN1K berhasil menyabet gelar juara pertama dalam Turnamen Futsal Antar Ikatan Alumni SMA se-Jawa Tengah. Pertandingan final yang berlangsung sengit berakhir dengan skor 3-2. Kemenangan ini menjadi ajang pembuktian kekompakan alumni di bidang olahraga.",
    kategori: "Prestasi",
    penulis: "Dept. Olahraga",
    published_at: new Date("2024-01-15"),
    tags: ["Olahraga", "Futsal", "Juara"],
    slug: "tim-futsal-alumni-juara-1",
    status: "approved",
    gambar_url: achievementImages[1]
  },
  {
    judul: "Workshop Digital Marketing untuk UMKM Alumni",
    konten: "Departemen Ekonomi Kreatif IKASMAN1K menyelenggarakan Workshop Digital Marketing bagi para alumni pelaku UMKM. Acara ini menghadirkan pakar pemasaran digital nasional. Peserta diajarkan cara mengoptimalkan media sosial dan marketplace untuk meningkatkan omzet penjualan.",
    kategori: "Jurnal Kegiatan",
    penulis: "Dept. Ekraf",
    published_at: new Date("2023-12-05"),
    tags: ["Workshop", "UMKM", "Bisnis"],
    slug: "workshop-digital-marketing-umkm",
    status: "approved",
    gambar_url: eventImages[2]
  },
  {
    judul: "Pengumuman Hasil Seleksi Masuk Perguruan Tinggi Jalur SNBP 2024",
    konten: "Selamat kepada 45 siswa SMA Negeri 1 Kendal yang berhasil lolos seleksi masuk perguruan tinggi negeri melalui jalur SNBP. Kami berharap prestasi ini dapat memotivasi adik-adik kelas untuk terus belajar dengan giat. Daftar nama siswa yang diterima dapat dilihat pada papan pengumuman sekolah.",
    kategori: "Pengumuman",
    penulis: "BK Sekolah",
    published_at: new Date("2024-03-29"),
    tags: ["SNBP", "PTN", "Akademik"],
    slug: "pengumuman-snbp-2024",
    status: "approved",
    gambar_url: schoolImages[1]
  },
  {
    judul: "Peringatan Hari Guru Nasional: Terima Kasih Guruku",
    konten: "Dalam rangka memperingati Hari Guru Nasional, Siswa dan Alumni mengadakan upacara bendera dan persembahan seni untuk para guru. Suasana haru menyelimuti acara saat para alumni memberikan bunga sebagai tanda terima kasih atas jasa para guru yang telah mendidik mereka.",
    kategori: "Kegiatan",
    penulis: "OSIS & Alumni",
    published_at: new Date("2023-11-25"),
    tags: ["Hari Guru", "Peringatan"],
    slug: "peringatan-hari-guru",
    status: "approved",
    gambar_url: schoolImages[2]
  },
  {
    judul: "Donor Darah Rutin: Setetes Darah Sejuta Harapan",
    konten: "Kegiatan donor darah rutin kembali dilaksanakan di Aula SMA 1 Kendal bekerjasama dengan PMI Kab. Kendal. Antusiasme donor dari kalangan siswa, guru, dan alumni sangat tinggi. Sebanyak 120 kantong darah berhasil terkumpul dalam kegiatan ini.",
    kategori: "Kabar Sosial",
    penulis: "Dept. Kesehatan",
    published_at: new Date("2023-10-10"),
    tags: ["Donor Darah", "Sosial", "Kesehatan"],
    slug: "donor-darah-rutin",
    status: "approved",
    gambar_url: eventImages[1]
  },
  {
    judul: "Inovasi Siswa: Alat Pendeteksi Banjir Sederhana Berbasis IoT",
    konten: "Tiga siswa SMA 1 Kendal berhasil menciptakan prototipe alat pendeteksi banjir sederhana berbasis IoT yang dapat memberikan peringatan dini ke smartphone warga. Inovasi ini diharapkan dapat diterapkan di daerah rawan banjir di sekitar Kendal.",
    kategori: "Prestasi",
    penulis: "Klub Robotik",
    published_at: new Date("2023-09-15"),
    tags: ["Inovasi", "Teknologi", "Karya Ilmiah"],
    slug: "inovasi-pendeteksi-banjir",
    status: "approved",
    gambar_url: schoolImages[3]
  },
  {
    judul: "Siaran Pers: Pelantikan Pengurus Baru IKASMAN1K Periode 2022-2025",
    konten: "Bertempat di Pendopo Kabupaten, Pelantikan Pengurus Baru IKASMAN1K Periode 2022-2025 berlangsung khidmat. Ketua Umum terpilih menyampaikan visi untuk menjadikan organisasi alumni yang inklusif dan progresif. Acara dihadiri oleh Bupati dan jajaran Forkopimda.",
    kategori: "Siaran Pers",
    penulis: "Sekretariat",
    published_at: new Date("2022-12-20"),
    tags: ["Pelantikan", "Organisasi", "Press Release"],
    slug: "pelantikan-pengurus-baru",
    status: "approved",
    gambar_url: eventImages[2]
  },
  {
    judul: "Senam Sehat Minggu Pagi Bersama Warga Sekitar",
    konten: "Untuk menjaga kebugaran dan mempererat hubungan dengan masyarakat sekitar sekolah, diadakan senam sehat minggu pagi di lapangan basket SMA 1 Kendal. Kegiatan ini terbuka untuk umum dan diikuti oleh ratusan peserta.",
    kategori: "Kegiatan",
    penulis: "Humas",
    published_at: new Date("2023-08-05"),
    tags: ["Olahraga", "Masyarakat", "Sehat"],
    slug: "senam-sehat-minggu-pagi",
    status: "approved",
    gambar_url: eventImages[0]
  }
];

async function seed() {
  await connectDB();
  console.log("Seeding realistic articles...");
  
  try {
    await Berita.deleteMany({}); // Clear existing to ensure clean slate
    await Berita.insertMany(articles);
    console.log("Articles seeded successfully!");
  } catch (error) {
    console.error("Error seeding:", error);
  }
  
  process.exit();
}

seed();
