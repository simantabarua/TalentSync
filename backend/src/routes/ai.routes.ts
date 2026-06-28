import { Router } from 'express';
import { generateCoverLetter, matchResume } from '../controllers/ai.controller';
import { protect, loadUser } from '../middleware/auth.middleware';

const router = Router();

router.post('/cover-letter', protect, loadUser, generateCoverLetter);
router.post('/match-resume', protect, loadUser, matchResume);

export default router;
