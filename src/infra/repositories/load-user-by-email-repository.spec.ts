import dotenv from 'dotenv';
dotenv.config();
import { Collection, MongoClient, Db } from 'mongodb';

class LoadUserByEmailRepository {
  constructor(private userModel: Collection<any>) {}

  async load(email: string) {
    return this.userModel.findOne({ email });
  }
}

const makeSut = async (userModel: Collection<any>) => {
  const sut = new LoadUserByEmailRepository(userModel);

  return { sut };
};

describe('LoadUserByEmail Repository', () => {
  let client: MongoClient;
  let db: Db;

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = client.db();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  afterAll(async () => {
    await client.close();
  });

  it('Should return null if no user is found', async () => {
    const userModel = db.collection('users');
    const { sut } = await makeSut(userModel);
    const user = await sut.load('invalid_email@mail.com');

    expect(user).toBeNull();
  });

  it('Should return an user', async () => {
    const userModel = db.collection('users');
    await userModel.insertOne({
      email: 'valid_email@mail.com',
    });

    const { sut } = await makeSut(userModel);
    const user = await sut.load('valid_email@mail.com');

    expect(user.email).toBe('valid_email@mail.com');
  });
});
