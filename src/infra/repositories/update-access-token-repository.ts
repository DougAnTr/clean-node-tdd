import { Collection } from 'mongodb';

export class UpdateAccessTokenRepository {
  userModel: Collection<any>;

  constructor(userModel: Collection<any>) {
    this.userModel = userModel;
  }

  async update(userId: string, accessToken: string): Promise<void> {
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
