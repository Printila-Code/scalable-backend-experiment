// src/app.ts
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Database and cache connections
import mongoose from './config/mongoose';
import redisClient from './config/redis';

// Import middleware and routes
import { rateLimitMiddleware } from './middleware/rateLimit';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import feedRoutes from './routes/feed';

// Critical fast-path middleware
import { hyperMiddleware } from './middleware/lightning-middleware';

const app = express();

// Connect to MongoDB and Redis
mongoose.connect();
redisClient.connect().catch(console.error);

// Global middleware
app.use(express.json());
app.use(rateLimitMiddleware);
app.use(hyperMiddleware);

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/feed', feedRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

// Pre-warm critical connections to reduce cold starts
async function prewarm() {
  console.log('Prewarming connections and thread pools...');
  // Example (pseudo-code): await somePool.warm(500);
}
prewarm();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} (PID: ${process.pid})`)
);

export default app; // Exported for testing purposes
