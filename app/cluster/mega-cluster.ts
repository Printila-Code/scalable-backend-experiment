// app/cluster/mega-cluster.ts
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length * 2; // Use hyperthreading

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Worker processes load the Express server.
  require('../../src/app');
}
