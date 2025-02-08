// // src/config/redis.ts
// import { createClient } from 'redis';

// const redisClient = createClient({
//   url: process.env.REDIS_URL,
//   legacyMode: true  // Enable legacy mode for compatibility with rate-limiter-flexible
// });

// // Connect using legacy mode – note that you should call .connect() after enabling legacy mode.
// // redisClient.connect().catch(console.error);

// export default redisClient;



// src/config/redis.ts
// import { createClient } from 'redis';

// const redisClient = createClient({
//   url: process.env.REDIS_URL,
//   legacyMode: true
// });

// export default {
//   connect: async () => {
//     try {
//       await redisClient.connect();
//       console.log('Connected to Redis');
//     } catch (error) {
//       console.error('Redis connection error:', error);
//       process.exit(1);
//     }
//   },
//   client: redisClient
// };



// src/config/redis.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
  legacyMode: true
});

// Connection event handlers
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
  process.exit(1); // Optional: Exit process on connection error
});

// Connect to Redis
redisClient.connect().catch(err => {
  console.error('Redis connection failed:', err);
  process.exit(1);
});

export default redisClient;