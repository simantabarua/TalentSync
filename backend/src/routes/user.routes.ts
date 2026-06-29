import { Router } from 'express';
import { getMyProfile, updateProfile, uploadResume } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = Router();

// Configure Cloudinary
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

// Configure Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'talentsync/resumes',
      format: 'pdf', // We will convert to PDF or keep original
      resource_type: 'raw', // Support non-image files like PDF, DOCX
      allowed_formats: ['pdf', 'doc', 'docx']
    };
  }
});

const upload = multer({ storage: storage });

router.use(protect);

router.route('/me')
  .get(getMyProfile)
  .put(updateProfile);

router.post('/me/resume', upload.single('resume'), uploadResume);

export default router;
