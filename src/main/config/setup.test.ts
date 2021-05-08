import request from 'supertest';
import app from './app';

describe('App setup', () => {
  it('Should disable x-powered-by', async () => {
    app.get('/test_x_powered_by', (req, res) => res.send(''));

    const res = await request(app).get('/test_x_powered_by');

    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
