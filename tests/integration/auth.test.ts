

// tests/integration/auth.test.ts
import request from 'supertest';
import app from '../../src/app';

describe('Auth API Integration Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('email');
  });

  it('should login an existing user', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'login@example.com', password: 'password123' });
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'login@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('token');
  });
});
