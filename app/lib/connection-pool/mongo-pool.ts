// app/lib/connection-pool/mongo-pool.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!, {
  minPoolSize: 500,       // Minimum number of connections
  maxPoolSize: 2500,      // Maximum number of connections
  maxIdleTimeMS: 30000,   // Recycle idle connections every 30 sec
  socketTimeoutMS: 1000,  // Fast fail for socket timeouts
  monitorCommands: true   // Enable command monitoring for metrics
});

client.connect().then(() => {
  console.log("Connected to MongoDB with aggressive pooling");
}).catch(console.error);

export default client;
