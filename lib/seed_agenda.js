/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const AgendaSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true },
    deskripsi: String,
    tanggal_mulai: { type: Date, required: true },
    tanggal_selesai: Date,
    lokasi: String,
    gambar_url: String,
    kategori: String, // Added for filtering
  },
  { timestamps: true }
);

const Agenda = mongoose.models.Agenda || mongoose.model("Agenda", AgendaSchema);

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ikasmandakendal");
    console.log("Connected to MongoDB");

    const dummyAgendas = [
      {
        judul: "Reuni Akbar Lintas Angkatan 2026",
        deskripsi:
          "Pertemuan besar seluruh alumni SMA Negeri 1 Kendal dari semua angkatan. Mari menjalin silaturahmi dan mengenang masa sekolah.",
        tanggal_mulai: new Date("2026-06-20T08:00:00"),
        tanggal_selesai: new Date("2026-06-21T17:00:00"),
        lokasi: "Halaman SMAN 1 Kendal",
        kategori: "Reuni",
      },
      {
        judul: "Workshop Entrepreneurship Alumni",
        deskripsi:
          "Pelatihan bisnis digital dan entrepreneurship oleh para praktisi alumni sukses untuk membantu ekonomi kreatif para anggota.",
        tanggal_mulai: new Date("2026-03-15T09:00:00"),
        tanggal_selesai: new Date("2026-03-15T15:00:00"),
        lokasi: "Auditorium Perpustakaan Kendal",
        kategori: "Workshop",
      },
      {
        judul: "IKASMANDA Golf & Tennis Tournament",
        deskripsi:
          "Turnamen olahraga persahabatan antar alumni untuk meningkatkan kesehatan dan jejaring bisnis.",
        tanggal_mulai: new Date("2026-04-10T07:00:00"),
        tanggal_selesai: new Date("2026-04-12T16:00:00"),
        lokasi: "Semarang Royale Golf",
        kategori: "Olahraga",
      },
      {
        judul: "Bakti Sosial & Santunan Ramadhan",
        deskripsi:
          "Berbagi kebahagiaan bersama anak-anak yatim dan dhuafa di sekitar kabupaten Kendal.",
        tanggal_mulai: new Date("2026-03-25T16:00:00"),
        tanggal_selesai: new Date("2026-03-25T19:00:00"),
        lokasi: "Masjid Agung Kendal",
        kategori: "Sosial",
      },
    ];

    for (const item of dummyAgendas) {
      await Agenda.findOneAndUpdate({ judul: item.judul }, item, {
        upsert: true,
      });
    }

    console.log("Agenda Seeding successful!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
