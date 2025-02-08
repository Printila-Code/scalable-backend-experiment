// src/controllers/user.ts
import { Request, Response } from 'express';

// Export the getProfile function
export const getProfile = async (req: Request, res: Response) => {
  // Your logic to get a user profile
  res.status(200).json({ email: 'user@example.com' });
};
