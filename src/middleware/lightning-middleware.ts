// src/middleware/lightning-middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const hyperMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      (req as any).user = jwt.verify(token, config.jwtSecret);
    } catch (error) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  }
  next();
};
