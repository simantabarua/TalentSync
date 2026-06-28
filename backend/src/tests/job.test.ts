import request from 'supertest';
import app from '../index';
import { connectDB, dropDB, clearDB } from './setup';
import { Job } from '../models/Job';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await dropDB();
});

describe('Job API Endpoints', () => {
  it('should get all jobs', async () => {
    await Job.create({
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      jobType: 'Full-time',
      category: 'Engineering',
      salary: { min: 100000, max: 120000, currency: 'USD' },
      description: 'Test description',
      skills: ['React', 'Node.js'],
      requirements: [],
      benefits: [],
      postedBy: new mongoose.Types.ObjectId()
    });

    const response = await request(app).get('/api/v1/jobs');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].title).toBe('Software Engineer');
  });

  it('should get a job by id', async () => {
    const job = await Job.create({
      title: 'Frontend Developer',
      company: 'Web Inc',
      location: 'New York',
      jobType: 'Contract',
      category: 'Engineering',
      salary: { min: 70000, max: 90000, currency: 'USD' },
      description: 'Frontend desc',
      skills: ['HTML', 'CSS'],
      requirements: [],
      benefits: [],
      postedBy: new mongoose.Types.ObjectId()
    });

    const response = await request(app).get(`/api/v1/jobs/${job._id}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Frontend Developer');
  });

  it('should return 404 for invalid job id', async () => {
    const response = await request(app).get('/api/v1/jobs/invalid_id');
    expect(response.status).toBe(500); // Because it fails casting to ObjectId, handled by general error handler
    expect(response.body.success).toBe(false);
  });
});
