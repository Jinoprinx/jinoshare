import { connectDb } from '../../../common/dist/db';
import { User } from '../models/User';
import { addContactToList } from '../providers/email-marketing';
import mongoose from 'mongoose';

const backfill = async () => {
  await connectDb();
  console.log('Connected to database. Starting backfill...');

  const users = await User.find({ email: { $ne: null } });
  console.log(`Found ${users.length} users to process.`);

  for (const user of users) {
    if (user.email && user.firstName) {
      console.log(`Adding ${user.email} to marketing list...`);
      await addContactToList(user.email, `${user.firstName} ${user.lastName || ''}`);
    }
  }

  console.log('Backfill complete.');
  await mongoose.disconnect();
  console.log('Database connection closed.');
  process.exit(0);
};

backfill().catch(err => {
  console.error('Error during backfill:', err);
  process.exit(1);
});
