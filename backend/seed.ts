import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Job } from './src/models/Job';

dotenv.config();

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
    postedBy: new mongoose.Types.ObjectId() // Mock user ID for seeding
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
    postedBy: new mongoose.Types.ObjectId()
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
    postedBy: new mongoose.Types.ObjectId()
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
    postedBy: new mongoose.Types.ObjectId()
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected');
    
    await Job.deleteMany(); // Clear existing jobs
    console.log('Existing jobs cleared');

    await Job.insertMany(jobs);
    console.log('Sample jobs inserted');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
