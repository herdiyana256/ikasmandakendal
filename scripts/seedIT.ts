import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

async function seedIT() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
      console.error('MONGODB_URI is not defined in .env.local');
      process.exit(1);
  }

  await mongoose.connect(uri);

  // Check if IT admin exists
  const existingIT = await User.findOne({ email: 'it@ikasmandakendal.or.id' });
  if (existingIT) {
      console.log('⚠️ IT Super Admin already exists.');
      // Update role just in case
      if (existingIT.role !== 'IT') {
          existingIT.role = 'IT';
          await existingIT.save();
          console.log('🔄 Updated existing user to IT role.');
      }
      await mongoose.disconnect();
      return;
  }

  const hashedPassword = await bcrypt.hash('superadmin123', 10);

  await User.create({
    username: 'it_support',
    email: 'it@ikasmandakendal.or.id',
    password: hashedPassword,
    nama_depan: 'IT',
    nama_belakang: 'Support',
    role: 'IT',
    is_verified: true,
  });

  console.log('🚀 IT Super Admin created!');
  console.log('Username: it_support');
  console.log('Email: it@ikasmandakendal.or.id');
  console.log('Password: superadmin123');
  
  await mongoose.disconnect();
}

seedIT();
