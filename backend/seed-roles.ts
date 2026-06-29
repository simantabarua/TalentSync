import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './src/models/User';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const seedRoles = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('Error: MONGO_URI is not set in environment or .env');
    process.exit(1);
  }

  const demoUsers = [
    {
      clerkId: 'user_demo_candidate',
      name: 'Demo Candidate',
      email: 'candidate@talentsync.com',
      role: 'USER' as const,
      bio: 'Experienced full stack developer looking for React/Node opportunities.',
      skills: ['React', 'Node.js', 'TypeScript', 'Express', 'MongoDB'],
    },
    {
      clerkId: 'user_demo_manager',
      name: 'Demo Manager',
      email: 'manager@talentsync.com',
      role: 'MANAGER' as const,
      bio: 'Engineering Manager at TalentSync looking for senior tech talent.',
      skills: ['Team Leadership', 'Agile', 'System Design'],
    },
    {
      clerkId: 'user_demo_admin',
      name: 'Demo Admin',
      email: 'admin@talentsync.com',
      role: 'ADMIN' as const,
      bio: 'Platform administrator for TalentSync.',
      skills: ['Database Administration', 'Infrastructure', 'Security'],
    },
  ];

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    for (const demoUser of demoUsers) {
      const existing = await User.findOne({ email: demoUser.email });
      if (existing) {
        existing.role = demoUser.role;
        existing.clerkId = demoUser.clerkId;
        existing.name = demoUser.name;
        existing.bio = demoUser.bio;
        existing.skills = demoUser.skills;
        await existing.save();
        console.log(`Updated existing user: ${demoUser.email} to role "${demoUser.role}"`);
      } else {
        const newUser = new User(demoUser);
        await newUser.save();
        console.log(`Created new user: ${demoUser.email} with role "${demoUser.role}"`);
      }
    }

    console.log('Successfully seeded all 3 demo users!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedRoles();
