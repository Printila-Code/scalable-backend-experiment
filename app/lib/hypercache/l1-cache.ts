// app/lib/hypercache/l1-cache.ts
import { LRUCache } from 'lru-cache';

const options = {
  max: 1_000_000, // up to 1M entries
  ttl: 1000       // TTL: 1 second (adjust as needed)
};

const l1Cache = new LRUCache<string, any>(options);

export const getFromCache = (key: string) => l1Cache.get(key);
export const setInCache = (key: string, value: any) => l1Cache.set(key, value);
