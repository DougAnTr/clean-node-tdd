import { hash, hashSync } from 'bcrypt';
import { Db } from 'mongodb';
import request from 'supertest';
import MongoHelper from '../../infra/helpers/mongo-helper';
import app from '../config/app';

describe('Login Routes', () => {
  let db: Db;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '');
    db = await MongoHelper.getDb();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('Should return 200 when valid credentials are provided', async () => {
    await db.collection('users').insertOne({
      email: 'valid_email@mail.com',
      password: hashSync('hashed_password', 10),
    });

    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@mail.com',
        password: 'hashed_password',
      })
      .expect(200);
  });
});
