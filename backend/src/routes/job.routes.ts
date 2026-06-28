import { Router } from 'express';
import { getJobs, getJobById, createJob, updateJob, deleteJob } from '../controllers/job.controller';
import { protect, loadUser, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected routes (Admin / Manager)
router.post('/', protect, loadUser, authorize('ADMIN', 'MANAGER'), createJob);
router.put('/:id', protect, loadUser, authorize('ADMIN', 'MANAGER'), updateJob);
router.delete('/:id', protect, loadUser, authorize('ADMIN'), deleteJob);

export default router;
