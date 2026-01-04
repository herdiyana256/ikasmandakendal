/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/ikasmandakendal";

const LowonganKerjaSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true },
    perusahaan: { type: String, required: true },
    deskripsi: String,
    lokasi: String,
    tipe_pekerjaan: {
      type: String,
      enum: ["Full Time", "Part Time", "Contract", "Freelance", "Internship"],
    },
    gaji_min: Number,
    gaji_max: Number,
    requirements: String,
    contact_email: String,
    contact_phone: String,
    deadline: Date,
    status: { type: String, enum: ["active", "closed"], default: "active" },
  },
  { timestamps: true }
);

const LowonganKerja =
  mongoose.models.LowonganKerja ||
  mongoose.model("LowonganKerja", LowonganKerjaSchema);

async function seedLoker() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const jobs = [
      {
        judul: "Senior Full Stack Developer",
        perusahaan: "TechAlumni Solutions",
        deskripsi:
          "Kami mencari pengembang berpengalaman untuk membangun platform komunitas alumni masa depan menggunakan Next.js dan Node.js.",
        lokasi: "Jakarta (Remote Friendly)",
        tipe_pekerjaan: "Full Time",
        gaji_min: 15000000,
        gaji_max: 25000000,
        requirements: "React, Node.js, MongoDB, 5+ tahun pengalaman.",
        status: "active",
      },
      {
        judul: "Digital Marketing Specialist",
        perusahaan: "Kendal Kreatif Agency",
        deskripsi:
          "Kelola kampanye digital untuk berbagai klien UMKM di Kendal dan sekitarnya.",
        lokasi: "Kendal",
        tipe_pekerjaan: "Full Time",
        gaji_min: 5000000,
        gaji_max: 8000000,
        requirements: "SEO, SEM, Social Media Management.",
        status: "active",
      },
      {
        judul: "Accountant",
        perusahaan: "PT Maju Bersama Alumni",
        deskripsi:
          "Bertanggung jawab atas laporan keuangan bulanan dan audit internal.",
        lokasi: "Semarang",
        tipe_pekerjaan: "Contract",
        gaji_min: 6000000,
        gaji_max: 9000000,
        requirements: "S1 Akuntansi, sertifikasi Brevet A/B diutamakan.",
        status: "active",
      },
      {
        judul: "UI/UX Designer",
        perusahaan: "Design Alumni Studio",
        deskripsi:
          "Buat desain interface yang memukau untuk aplikasi mobile dan web.",
        lokasi: "Kendal (WFH)",
        tipe_pekerjaan: "Freelance",
        gaji_min: 4000000,
        gaji_max: 7000000,
        requirements: "Figma, Adobe XD, Portfolio kuat.",
        status: "active",
      },
      {
        judul: "HR Generalist",
        perusahaan: "Smanda Group Holdings",
        deskripsi:
          "Mengelola rekrutmen dan pengembangan SDM internal perusahaan.",
        lokasi: "Jakarta Selatan",
        tipe_pekerjaan: "Full Time",
        gaji_min: 10000000,
        gaji_max: 14000000,
        requirements: "S1 Psikologi/Hukum, 3+ tahun pengalaman HR.",
        status: "active",
      },
    ];

    for (const job of jobs) {
      await LowonganKerja.findOneAndUpdate(
        { judul: job.judul, perusahaan: job.perusahaan },
        job,
        { upsert: true, new: true }
      );
    }

    console.log("Loker Seeding successful!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedLoker();
