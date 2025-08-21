import request from 'supertest';
import express from 'express';

// Mock the express app for testing
const app = express();
app.get("/health", (_, res) => res.json({ ok: true }));

describe('Health Check', () => {
  it('should return 200 and { ok: true }', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true });
  });
});
