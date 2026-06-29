import { Request, Response } from 'express';
import { Application } from '../models/Application';
import { Job } from '../models/Job';
import { User } from '../models/User';

// POST /api/v1/applications
export const applyForJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const jobId = req.body.jobId || req.body.job;
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found', errors: null });
      return;
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      userId: user._id,
      jobId: job._id
    });

    if (existingApplication) {
      res.status(400).json({ success: false, message: 'You have already applied for this job', errors: null });
      return;
    }

    const application = await Application.create({
      ...req.body,
      jobId,
      userId: user._id,
    });

    res.status(201).json({ success: true, data: application, message: 'Application submitted successfully', errors: null });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', errors: [{ message: (error as Error).message }] });
  }
};

// GET /api/v1/applications/my-applications
export const getMyApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    const applications = await Application.find({ userId: user._id })
      .populate('jobId', 'title company location status jobType salary')
      .sort({ createdAt: -1 });
    
    const mappedApplications = applications.map(app => {
      const appObj = app.toObject();
      return {
        ...appObj,
        job: appObj.jobId,
      };
    });
    
    res.json({ success: true, data: mappedApplications, message: 'Applications fetched successfully', errors: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: [{ message: (error as Error).message }] });
  }
};

// GET /api/v1/applications/job/:jobId
// Admin/Manager route
export const getApplicationsForJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found', errors: null });
      return;
    }

    // If manager, check if they posted this job
    if (user.role === 'MANAGER' && job.postedBy.toString() !== user._id.toString()) {
      res.status(403).json({ success: false, message: 'Forbidden', errors: null });
      return;
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'name email image')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: applications, message: 'Applications fetched successfully', errors: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: [{ message: (error as Error).message }] });
  }
};
