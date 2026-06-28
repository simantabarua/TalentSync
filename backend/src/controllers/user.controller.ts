import { Request, Response } from 'express';
import { User } from '../models/User';
import { z } from 'zod';

const updateProfileSchema = z.object({
  skills: z.array(z.string()).optional(),
  experience: z.string().optional(),
  bio: z.string().optional(),
});

export const getMyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const clerkId = (req as any).auth?.userId;
    if (!clerkId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const clerkId = (req as any).auth?.userId;
    if (!clerkId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const parsedBody = updateProfileSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({ success: false, message: 'Invalid data', errors: parsedBody.error.flatten().fieldErrors });
      return;
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: parsedBody.data },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const uploadResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const clerkId = (req as any).auth?.userId;
    if (!clerkId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    // req.file path is populated by multer-storage-cloudinary
    const resumeUrl = req.file.path;

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: { resumeUrl } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
