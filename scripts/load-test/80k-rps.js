// scripts/load-test/80k-rps.js
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    spike: {
      executor: 'ramping-arrival-rate',
      startRate: 1000,
      timeUnit: '1s',
      preAllocatedVUs: 1000,
      maxVUs: 15000,
      stages: [
        { target: 80000, duration: '1m' }, // ramp-up
        { target: 80000, duration: '5m' }  // sustain
      ]
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // less than 1% errors
    http_req_duration: ['p(99)<100'] // 99% of requests under 100ms
  }
};

export default function () {
  const res = http.get('http://api/endpoint');
  check(res, { 'status is 200': (r) => r.status === 200 });
}
