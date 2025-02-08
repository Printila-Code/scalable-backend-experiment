// src/controllers/auth.ts
import { Request, Response } from 'express';

// Export the register function
export const register = async (req: Request, res: Response) => {
  // Your registration logic here
  res.status(201).json({ message: 'User registered' });
};

// Export the login function
export const login = async (req: Request, res: Response) => {
  // Your login logic here
  res.status(200).json({ token: 'JWT-token' });
};
