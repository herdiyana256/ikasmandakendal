/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

// MongoDB connection URI
const MONGODB_URI = "mongodb://localhost:27017/ikasmandakendal";

async function seedDonasi() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding Donasi...");

    const DonasiSchema = new mongoose.Schema(
      {
        nama_campaign: String,
        deskripsi: String,
        target_amount: Number,
        current_amount: Number,
        gambar_url: String,
        status: String,
        deadline: Date,
      },
      { timestamps: true }
    );

    const Donasi =
      mongoose.models.Donasi || mongoose.model("Donasi", DonasiSchema);

    const campaigns = [
      {
        nama_campaign: "Beasiswa Alumni Berprestasi",
        deskripsi:
          "Dana digunakan untuk beasiswa siswa berprestasi SMA Negeri 1 Kendal yang membutuhkan dukungan finansial untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.",
        target_amount: 50000000,
        current_amount: 15250000,
        gambar_url: "/peduli-pendidikan.jpg",
        status: "active",
        deadline: new Date("2026-12-31"),
      },
      {
        nama_campaign: "Donor Darah & Kegiatan Sosial",
        deskripsi:
          "Dana digunakan untuk pembelian logistik, penyelenggaraan kegiatan sosial tahunan, dan dukungan kesehatan bagi masyarakat kurang mampu di sekitar Kendal.",
        target_amount: 25000000,
        current_amount: 8750000,
        gambar_url: "/donasi-campaign.jpg",
        status: "active",
        deadline: new Date("2026-06-30"),
      },
      {
        nama_campaign: "Renovasi Fasilitas Sekolah",
        deskripsi:
          "Proyek modernisasi laboratorium dan perpustakaan sekolah agar sejajar dengan standar internasional, demi mencetak generasi unggul SMANDA.",
        target_amount: 100000000,
        current_amount: 42000000,
        gambar_url: "/reuni-akbar.jpg",
        status: "active",
        deadline: new Date("2026-08-15"),
      },
    ];

    for (const campaign of campaigns) {
      await Donasi.findOneAndUpdate(
        { nama_campaign: campaign.nama_campaign },
        campaign,
        { upsert: true, new: true }
      );
    }

    console.log("Seeding Donasi completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedDonasi();
