import { Router } from 'express';
import { getProfile } from '../controllers/user';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/profile', authenticateJWT, getProfile);

export default router;
