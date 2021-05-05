import dotenv from 'dotenv';
dotenv.config();
import { Db } from 'mongodb';
import MongoHelper from '../helpers/mongo-helper';
import { LoadUserByEmailRepository } from './load-user-by-email-repository';

let db: Db;

const makeSut = async () => {
  const userModel = db.collection('users');
  const sut = new LoadUserByEmailRepository(userModel);

  return { sut, userModel };
};

describe('LoadUserByEmail Repository', () => {
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

  it('Should return null if no user is found', async () => {
    const { sut } = await makeSut();
    const user = await sut.load('invalid_email@mail.com');

    expect(user).toBeNull();
  });

  it('Should return an user', async () => {
    const { sut, userModel } = await makeSut();

    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password',
    });

    const user = await sut.load('valid_email@mail.com');

    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      password: fakeUser.ops[0].password,
    });
  });
});
