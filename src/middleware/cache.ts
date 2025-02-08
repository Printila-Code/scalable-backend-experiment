// src/middleware/cache.ts
import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    // Override res.json to cache the result
    const originalJson = res.json.bind(res);
    res.json = (data: any) => {
      redisClient.setEx(key, 60, JSON.stringify(data)); // Cache for 60 seconds
      return originalJson(data);
    };
    next();
  } catch (error) {
    next();
  }
};
