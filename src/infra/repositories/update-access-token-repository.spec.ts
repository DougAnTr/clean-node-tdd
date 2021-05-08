import { Collection, Db } from 'mongodb';
import MongoHelper from '../helpers/mongo-helper';

class UpdateAccessTokenRepository {
  userModel: Collection<any>;

  constructor(userModel: Collection<any>) {
    this.userModel = userModel;
  }

  async update(userId: string, accessToken: string) {
    await this.userModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          accessToken,
        },
      },
    );
  }
}

describe('UpdateAccessToken Repository', () => {
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

  it('Should update the user with the given accessToken', async () => {
    const userModel = db.collection('users');
    const sut = new UpdateAccessTokenRepository(userModel);

    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password',
    });

    await sut.update(fakeUser.ops[0]._id, 'valid_token');
    const updatedFakeUser = await userModel.findOne({
      _id: fakeUser.ops[0]._id,
    });

    expect(updatedFakeUser.accessToken).toBe('valid_token');
  });
});
