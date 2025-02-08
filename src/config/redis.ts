// src/config/redis.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
  legacyMode: true  // Enable legacy mode for compatibility with rate-limiter-flexible
});

// Connect using legacy mode – note that you should call .connect() after enabling legacy mode.
// redisClient.connect().catch(console.error);

export default redisClient;
