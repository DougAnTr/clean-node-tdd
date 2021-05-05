import { Collection } from 'mongodb';

export class LoadUserByEmailRepository {
  constructor(private userModel: Collection<any>) {}

  async load(email: string): Promise<any> {
    return this.userModel.findOne({ email }, { projection: { password: 1 } });
  }
}
