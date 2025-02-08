// config/env.ts
export const config = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/app',
    redisURL: process.env.REDIS_URL || 'redis://localhost:6379',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key'
  };
  