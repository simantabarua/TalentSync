import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/models/User';
import { Job } from './src/models/Job';
import { Application } from './src/models/Application';

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('Error: MONGO_URI is not set in environment or .env');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');

    // 1. Clear existing collections
    await User.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();
    console.log('Cleared existing Users, Jobs, and Applications');

    // 2. Create the 3 demo users
    const candidateUser = new User({
      clerkId: 'user_3FoNZr78ZNyADlG0nNg8zFMHkvP',
      name: 'Demo Candidate',
      email: 'candidate@talentsync.com',
      role: 'USER',
      bio: 'Experienced full stack developer looking for React/Node opportunities.',
      skills: ['React', 'Node.js', 'TypeScript', 'Express', 'MongoDB'],
    });

    const managerUser = new User({
      clerkId: 'user_3FoNeMIRCK5kfcl0ekbr7aPHe4N',
      name: 'Demo Manager',
      email: 'manager@talentsync.com',
      role: 'MANAGER',
      bio: 'Engineering Manager at TalentSync looking for senior tech talent.',
      skills: ['Team Leadership', 'Agile', 'System Design'],
    });

    const adminUser = new User({
      clerkId: 'user_3FoNiow0N36DqIhFrlQvpfTBfUH',
      name: 'Demo Admin',
      email: 'admin@talentsync.com',
      role: 'ADMIN',
      bio: 'Platform administrator for TalentSync.',
      skills: ['Database Administration', 'Infrastructure', 'Security'],
    });

    const simantaUser1 = new User({
      clerkId: 'user_3FoFFT6B6H4pC21ev9QluxklanG',
      name: 'Simanta barua',
      email: 'simanta.barua1@gmail.com',
      role: 'USER',
      skills: ['React', 'Node.js', 'TypeScript'],
    });

    const simantaUser2 = new User({
      clerkId: 'user_3Fln8G1EHeE1ZQ0uf6GuQq9yYOX',
      name: 'simanta barua',
      email: 'webdevelopersimanta@gmail.com',
      role: 'USER',
      skills: ['React', 'Node.js'],
    });

    await candidateUser.save();
    await managerUser.save();
    await adminUser.save();
    await simantaUser1.save();
    await simantaUser2.save();
    console.log('Seeded Users');

    // 3. Create jobs posted by managerUser
    const jobs = [
      {
        title: 'Senior Frontend Developer',
        company: 'TechCorp AI',
        location: 'Remote',
        salary: { min: 120000, max: 150000, currency: 'USD' },
        jobType: 'Full-time',
        category: 'Engineering',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        description: 'We are looking for an experienced Frontend Developer with strong React and Next.js skills to lead our UI team. You will be responsible for architecting scalable frontend applications.',
        requirements: ['5+ years of experience', 'Expert in React', 'Experience with Next.js App Router'],
        benefits: ['Health Insurance', 'Remote Work', 'Unlimited PTO'],
        status: 'Active',
        postedBy: managerUser._id
      },
      {
        title: 'Machine Learning Engineer',
        company: 'DataSolutions',
        location: 'New York, NY',
        salary: { min: 140000, max: 180000, currency: 'USD' },
        jobType: 'Full-time',
        category: 'Engineering',
        skills: ['Python', 'PyTorch', 'NLP', 'GenAI'],
        description: 'Join our data science team to build and deploy state-of-the-art NLP models. Experience with Python, PyTorch, and generative AI is highly preferred.',
        requirements: ['MS or PhD in CS/AI', 'Strong Python skills', 'Experience with PyTorch or TensorFlow'],
        benefits: ['401k Match', 'Health Insurance', 'Relocation Assistance'],
        status: 'Active',
        postedBy: managerUser._id
      },
      {
        title: 'Product Manager',
        company: 'InnovateTech',
        location: 'San Francisco, CA (Hybrid)',
        salary: { min: 130000, max: 160000, currency: 'USD' },
        jobType: 'Full-time',
        category: 'Product',
        skills: ['Agile', 'Jira', 'Roadmapping', 'User Research'],
        description: 'Seeking a Product Manager to drive the development of our next-gen B2B SaaS platform. You will work closely with engineering and design to deliver high-quality features.',
        requirements: ['3+ years in Product Management', 'B2B SaaS experience', 'Excellent communication'],
        benefits: ['Equity', 'Health Insurance', 'Flexible Hours'],
        status: 'Active',
        postedBy: managerUser._id
      },
      {
        title: 'Backend Node.js Developer',
        company: 'FintechStartup',
        location: 'London, UK',
        salary: { min: 90000, max: 120000, currency: 'GBP' },
        jobType: 'Contract',
        category: 'Engineering',
        skills: ['Node.js', 'Express', 'MongoDB', 'TypeScript'],
        description: 'Looking for a solid Backend Developer proficient in Node.js, Express, and MongoDB to help scale our microservices architecture.',
        requirements: ['Strong Node.js experience', 'MongoDB expertise', 'REST API design'],
        benefits: ['Fully Remote', 'Flexible Hours'],
        status: 'Active',
        postedBy: managerUser._id
      }
    ];

    const seededJobs = await Job.insertMany(jobs);
    console.log('Seeded Jobs');

    // 4. Create sample Application by candidateUser
    const application = new Application({
      jobId: seededJobs[0]._id,
      userId: candidateUser._id,
      resume: {
        url: 'https://res.cloudinary.com/dzdtfginc/image/upload/v1700000000/sample_resume.pdf',
        filename: 'candidate_resume.pdf',
        mimeType: 'application/pdf',
        size: 102400
      },
      coverLetter: 'Dear Hiring Manager,\n\nI am thrilled to apply for the Senior Frontend Developer position at TechCorp AI. With over 5 years of experience building responsive, accessible web applications with React, Next.js, and TypeScript, I am confident in my ability to make a significant contribution to your team.\n\nBest regards,\nDemo Candidate',
      status: 'Pending',
      matchScore: 92
    });

    await application.save();
    console.log('Seeded Application');

    console.log('Successfully seeded all database collections!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
