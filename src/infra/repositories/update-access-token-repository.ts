import MongoHelper from '../helpers/mongo-helper';

export class UpdateAccessTokenRepository {
  async update(userId: string, accessToken: string): Promise<void> {
    const db = await MongoHelper.getDb();
    await db.collection('users').updateOne(
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
