// app/workers/thread-pool.ts
import { Worker } from 'worker_threads';
import os from 'os';

const THREAD_POOL_SIZE = os.cpus().length;
const workers: Worker[] = [];

for (let i = 0; i < THREAD_POOL_SIZE; i++) {
  // Ensure the worker script is compiled (e.g. from TypeScript to JS)
  const worker = new Worker('./dist/services/cpu-intensive.js');
  workers.push(worker);
}

export const runInWorker = (task: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const worker = workers.shift();
    if (!worker) return reject(new Error("No available worker"));
    worker.once('message', (result) => {
      workers.push(worker);
      resolve(result);
    });
    worker.postMessage(task);
  });
};
