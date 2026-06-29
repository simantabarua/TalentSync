import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './src/models/User';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const setRole = async () => {
  const emailOrClerkId = process.argv[2];
  const targetRole = process.argv[3]?.toUpperCase();

  if (!emailOrClerkId || !targetRole) {
    console.error('Usage: npm run set-role <email_or_clerkId> <USER|MANAGER|ADMIN>');
    process.exit(1);
  }

  if (!['USER', 'MANAGER', 'ADMIN'].includes(targetRole)) {
    console.error('Error: Role must be USER, MANAGER, or ADMIN');
    process.exit(1);
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('Error: MONGO_URI is not set in environment or .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const user = await User.findOneAndUpdate(
      { $or: [{ email: emailOrClerkId }, { clerkId: emailOrClerkId }] },
      { $set: { role: targetRole } },
      { new: true }
    );

    if (!user) {
      console.error(`Error: User with email/clerkId "${emailOrClerkId}" not found in database.`);
      process.exit(1);
    }

    console.log(`Success: Role for ${user.email} (${user.name}) updated to "${user.role}"`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

setRole();
