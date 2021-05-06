import MongoHelper from './mongo-helper';
import { config } from 'dotenv';

config();

describe('MongoHelper', () => {
  it('Should have a db connection when connect is invoked', async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '');

    expect(MongoHelper.db).toBeTruthy();
  });

  it('Should disconnect', async () => {
    await MongoHelper.disconnect();

    expect(MongoHelper.client.isConnected()).toBeFalsy();
  });

  it('Should return a db connection', async () => {
    const db = await MongoHelper.getDb();

    expect(db).toBeTruthy();
  });

  afterAll(() => {
    MongoHelper.disconnect();
  });
});
