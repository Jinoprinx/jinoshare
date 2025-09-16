import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/User';
import { connectDb } from './db';

const seedAdmin = async () => {
  await connectDb();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password';

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = new User({
    email: adminEmail,
    password: hashedPassword,
    role: 'admin',
    name: 'Admin User',
  });

  await adminUser.save();
  console.log('Admin user created successfully.');
};

seedAdmin().then(() => {
  mongoose.connection.close();
});
