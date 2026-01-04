const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

// Define Schema minimal for User (Must match User.ts structure mostly)
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nama_depan: String,
    nama_belakang: String,
    role: {
      type: String,
      enum: ["admin", "alumni", "IT", "user"],
      default: "alumni",
    },
    is_verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

async function seedUsers() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("❌ MONGODB_URI/DATABASE_URL not found in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to Database");

    const usersToSeed = [
      {
        username: "superadmin",
        email: "it@ikasmandakendal.com",
        password: "Admin#1234",
        role: "IT",
        nama_depan: "Super",
        nama_belakang: "Admin",
        is_verified: true,
      },
      {
        username: "admin_umum",
        email: "admin@ikasmandakendal.com",
        password: "Admin#1234",
        role: "admin",
        nama_depan: "Admin",
        nama_belakang: "Umum",
        is_verified: true,
      },
      {
        username: "alumni01",
        email: "alumni@test.com",
        password: "User#1234",
        role: "alumni",
        nama_depan: "Alumni",
        nama_belakang: "Satu",
        is_verified: true,
      },
      {
        username: "newuser",
        email: "new@test.com",
        password: "User#1234",
        role: "user",
        nama_depan: "User",
        nama_belakang: "Baru",
        is_verified: false,
      },
    ];

    for (const u of usersToSeed) {
      // Check if exists
      const exists = await User.findOne({
        $or: [{ email: u.email }, { username: u.username }],
      });
      if (exists) {
        console.log(`⚠️ User ${u.username} already exists. Updating password.`);

        // Update password to match documentation
        const hashedPassword = await bcrypt.hash(u.password, 10);
        await User.findByIdAndUpdate(exists._id, {
          password: hashedPassword,
          role: u.role, // Ensure role matches
          email: u.email, // Ensure email matches (e.g. .org -> .com update)
        });

        continue;
      }

      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({
        ...u,
        password: hashedPassword,
      });
      console.log(`✅ Created user: ${u.username}`);
    }

    console.log("🎉 Seeding Completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
}

seedUsers();
