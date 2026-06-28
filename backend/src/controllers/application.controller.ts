import { Request, Response } from 'express';
import { Application } from '../models/Application';
import { Job } from '../models/Job';

// POST /api/v1/applications
export const applyForJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    
    // Check if job exists
    const job = await Job.findById(req.body.job);
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found', errors: null });
      return;
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      applicant: user._id,
      job: job._id
    });

    if (existingApplication) {
      res.status(400).json({ success: false, message: 'You have already applied for this job', errors: null });
      return;
    }

    const application = await Application.create({
      ...req.body,
      applicant: user._id,
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
    const applications = await Application.find({ applicant: user._id })
      .populate('job', 'title company location status type salary')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: applications, message: 'Applications fetched successfully', errors: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: [{ message: (error as Error).message }] });
  }
};

// GET /api/v1/applications/job/:jobId
// Admin/Manager route
export const getApplicationsForJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email image')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: applications, message: 'Applications fetched successfully', errors: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: [{ message: (error as Error).message }] });
  }
};
