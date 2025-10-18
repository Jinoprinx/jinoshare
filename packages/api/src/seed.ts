import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/User';
import { Plan } from './models/Plan';
import { connectDb } from '../../common/dist/db';

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password';

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log('Admin user already exists.');
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = new User({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      name: 'Admin User',
    });
    await adminUser.save();
    console.log('Admin user created successfully.');
  }
};

const seedPlans = async () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        '10 AI generations/day',
        '3 platforms',
        'Basic scheduler',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      price: 20000,
      features: [
        'Unlimited AI generations',
        '10 platforms + one-click publish',
        'Smart scheduler + best-time predictions',
        'UTM tracking & link shortener',
        'Brand voice profiles',
        '3 team seats + approvals',
        'Priority support',
      ],
    },
    {
      name: 'Business',
      price: 50000,
      features: [
        'Unlimited AI generations + assets',
        '15 platforms + per-channel customization',
        'Approvals, roles & permissions',
        'Advanced analytics & CSV export',
        '10 team seats included',
        'API access & webhooks',
      ],
    },
  ];

  for (const plan of plans) {
    const existingPlan = await Plan.findOne({ name: plan.name });
    if (existingPlan) {
      console.log(`Plan '${plan.name}' already exists.`);
    } else {
      await new Plan(plan).save();
      console.log(`Plan '${plan.name}' created successfully.`);
    }
  }
};

const seed = async () => {
  await connectDb();
  await seedAdmin();
  await seedPlans();
  mongoose.connection.close();
  process.exit(0);
};

seed();