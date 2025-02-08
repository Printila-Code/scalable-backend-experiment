// src/middleware/rateLimit.ts
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from '../config/redis';

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rlflx',
  points: 100,    // 100 points
  duration: 60,   // Per 60 seconds
});

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Provide a fallback value if req.ip is undefined
  const ip = req.ip || 'unknown-ip';
  rateLimiter.consume(ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};
