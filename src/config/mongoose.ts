// config/mongoose.ts
import mongoose from 'mongoose';

export default {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI!, {
        maxPoolSize: 100,
        minPoolSize: 10,
        socketTimeoutMS: 30000
      });
      console.log('Connected to MongoDB (standard connection)');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
};
