// src/types/express/index.d.ts
import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace "any" with your custom type if available (e.g., IUser)
    }
  }
}
