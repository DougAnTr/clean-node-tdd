import MongoHelper from '../helpers/mongo-helper';

export class LoadUserByEmailRepository {
  async load(email: string): Promise<any> {
    const db = await MongoHelper.getDb();

    return db
      .collection('users')
      .findOne({ email }, { projection: { password: 1 } });
  }
}
