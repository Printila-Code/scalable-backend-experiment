import { Router } from 'express';
import { fetchFeed } from '../controllers/feed';
import { cacheMiddleware } from '../middleware/cache';

const router = Router();

router.get('/', cacheMiddleware, fetchFeed);

export default router;
