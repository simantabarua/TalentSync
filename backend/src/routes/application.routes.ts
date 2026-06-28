import { Router } from 'express';
import { applyForJob, getMyApplications, getApplicationsForJob } from '../controllers/application.controller';
import { protect, loadUser, authorize } from '../middleware/auth.middleware';

const router = Router();

// All application routes require authentication
router.use(protect, loadUser);

router.post('/', applyForJob);
router.get('/my-applications', getMyApplications);

// Admin/Manager only
router.get('/job/:jobId', authorize('ADMIN', 'MANAGER'), getApplicationsForJob);

export default router;
