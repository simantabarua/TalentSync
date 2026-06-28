import request from 'supertest';
import app from '../index';
import { connectDB, dropDB, clearDB } from './setup';
import { Job } from '../models/Job';
import { Application } from '../models/Application';
import { User } from '../models/User';
import mongoose from 'mongoose';

// Mock Clerk middleware
jest.mock('@clerk/express', () => {
  return {
    requireAuth: () => (req: any, res: any, next: any) => {
      req.auth = { userId: 'test_clerk_id' };
      next();
    },
    getAuth: (req: any) => {
      return req.auth || { userId: 'test_clerk_id' };
    }
  };
});

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await dropDB();
});

describe('Application API Endpoints', () => {
  it('should apply to a job', async () => {
    // Create mock user
    const user = await User.create({
      clerkId: 'test_clerk_id',
      email: 'test@example.com',
      name: 'Test User'
    });

    const job = await Job.create({
      title: 'Backend Dev',
      company: 'Server Inc',
      location: 'Remote',
      jobType: 'Full-time',
      category: 'Engineering',
      salary: { min: 120000, max: 150000, currency: 'USD' },
      description: 'Backend desc',
      skills: ['Node.js'],
      requirements: [],
      benefits: [],
      postedBy: new mongoose.Types.ObjectId()
    });

    const response = await request(app)
      .post('/api/v1/applications')
      .send({
        jobId: job._id.toString(),
        coverLetter: 'This is my cover letter',
        resume: {
          url: 'http://example.com/resume.pdf',
          filename: 'resume.pdf',
          mimeType: 'application/pdf',
          size: 1024
        }
      });
    
    if (response.status !== 201) console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('Pending');
  });

  it('should get user applications', async () => {
    const user = await User.create({
      clerkId: 'test_clerk_id2',
      email: 'test2@example.com',
      name: 'Test User'
    });

    const job = await Job.create({
      title: 'DevOps Engineer',
      company: 'Cloud Corp',
      location: 'Remote',
      jobType: 'Full-time',
      category: 'Engineering',
      salary: { min: 110000, max: 130000, currency: 'USD' },
      description: 'DevOps desc',
      skills: ['AWS', 'Docker'],
      requirements: [],
      benefits: [],
      postedBy: new mongoose.Types.ObjectId()
    });

    await Application.create({
      jobId: job._id,
      userId: user._id,
      coverLetter: 'Cover letter 123',
      status: 'Pending',
      resume: {
        url: 'http://example.com/resume.pdf',
        filename: 'resume.pdf',
        mimeType: 'application/pdf',
        size: 1024
      }
    });

    // Mock clerk auth logic actually checks for test_clerk_id because we hardcoded it in jest.mock
    // So let's create a user with test_clerk_id
    const user2 = await User.create({
      clerkId: 'test_clerk_id',
      email: 'test_real@example.com',
      name: 'Test User'
    });
    
    await Application.create({
      jobId: job._id,
      userId: user2._id,
      coverLetter: 'Cover letter 123',
      status: 'Pending',
      resume: {
        url: 'http://example.com/resume.pdf',
        filename: 'resume.pdf',
        mimeType: 'application/pdf',
        size: 1024
      }
    });

    const response = await request(app).get('/api/v1/applications/my-applications');
    
    if (response.status !== 200) console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].coverLetter).toBe('Cover letter 123');
  });
});
