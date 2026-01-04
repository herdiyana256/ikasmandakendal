import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

async function seedAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
      console.error('MONGODB_URI is not defined in .env.local');
      process.exit(1);
  }

  await mongoose.connect(uri);

  // Check if admin exists
  const existingAdmin = await User.findOne({ email: 'admin@ikasmandakendal.or.id' });
  if (existingAdmin) {
      console.log('⚠️ Admin user already exists.');
      await mongoose.disconnect();
      return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
    username: 'admin',
    email: 'admin@ikasmandakendal.or.id',
    password: hashedPassword,
    nama_depan: 'Admin',
    nama_belakang: 'IKA SMANDA',
    role: 'admin',
    is_verified: true,
  });

  console.log('✅ Admin user created!');
  console.log('Username: admin');
  console.log('Password: admin123');
  
  await mongoose.disconnect();
}

seedAdmin();
