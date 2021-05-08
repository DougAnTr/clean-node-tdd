import app from '../config/app';
import request from 'supertest';

describe('CORS Middleware', () => {
  it('Should enable cors', async () => {
    app.get('/test_cors', (req, res) => res.send(''));

    const res = await request(app).get('/test_cors');

    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.headers['access-control-allow-headers']).toBe('*');
    expect(res.headers['access-control-allow-methods']).toBe('*');
  });
});
