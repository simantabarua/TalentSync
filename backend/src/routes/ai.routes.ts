import { Router } from 'express';
import { generateCoverLetter, matchResume } from '../controllers/ai.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/cover-letter', protect, generateCoverLetter);
router.post('/match-resume', protect, matchResume);

export default router;
