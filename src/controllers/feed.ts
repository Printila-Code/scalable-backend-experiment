// src/controllers/feed.ts
import { Request, Response } from 'express';

// Export the fetchFeed function
export const fetchFeed = async (req: Request, res: Response) => {
  // Your logic to fetch the feed (e.g., list of posts)
  res.status(200).json({ posts: [] });
};
