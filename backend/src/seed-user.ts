import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './models/User';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected');

    const clerkId = 'user_3Fln8G1EHeE1ZQ0uf6GuQq9yYOX';
    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({
        clerkId,
        name: 'Mithun Barua', // From the resume filename
        email: 'mithun@example.com',
        role: 'USER',
        skills: [],
      });
      await user.save();
      console.log('User created successfully:', user);
    } else {
      console.log('User already exists:', user);
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
