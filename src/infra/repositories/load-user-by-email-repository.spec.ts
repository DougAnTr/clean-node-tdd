import dotenv from 'dotenv';
dotenv.config();
import { Collection, MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

class LoadUserByEmailRepository {
  constructor(private userModel: Collection<any>) {}

  async load(email: string) {
    return this.userModel.findOne({ email });
  }
}

const makeSut = async () => {
  const userModel = db.collection('users');
  const sut = new LoadUserByEmailRepository(userModel);

  return { sut, userModel };
};

describe('LoadUserByEmail Repository', () => {
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
    const { sut } = await makeSut();
    const user = await sut.load('invalid_email@mail.com');

    expect(user).toBeNull();
  });

  it('Should return an user', async () => {
    const { sut, userModel } = await makeSut();

    await userModel.insertOne({
      email: 'valid_email@mail.com',
    });

    const user = await sut.load('valid_email@mail.com');

    expect(user.email).toBe('valid_email@mail.com');
  });
});
