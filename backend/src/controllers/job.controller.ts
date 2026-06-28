import { Request, Response } from 'express';
import { Job } from '../models/Job';

// GET /api/v1/jobs
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const query: any = { status: 'Active' };

    if (req.query.search) {
      query.$text = { $search: req.query.search as string };
    }
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }
    if (req.query.category) {
      query.category = req.query.category;
    }

    const jobs = await Job.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      data: jobs,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      message: 'Jobs fetched successfully',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      errors: [{ message: (error as Error).message }],
    });
  }
};

// GET /api/v1/jobs/:id
export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email image');
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found', errors: null });
      return;
    }
    res.json({ success: true, data: job, message: 'Job fetched successfully', errors: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: [{ message: (error as Error).message }] });
  }
};

// POST /api/v1/jobs
export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if req.user exists (from auth middleware)
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ success: false, message: 'Unauthorized', errors: null });
      return;
    }

    const job = await Job.create({
      ...req.body,
      postedBy: user._id,
    });
    res.status(201).json({ success: true, data: job, message: 'Job created successfully', errors: null });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', errors: [{ message: (error as Error).message }] });
  }
};

// PUT /api/v1/jobs/:id
export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found', errors: null });
      return;
    }
    res.json({ success: true, data: job, message: 'Job updated successfully', errors: null });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', errors: [{ message: (error as Error).message }] });
  }
};

// DELETE /api/v1/jobs/:id
export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found', errors: null });
      return;
    }
    res.json({ success: true, data: {}, message: 'Job deleted successfully', errors: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', errors: [{ message: (error as Error).message }] });
  }
};
