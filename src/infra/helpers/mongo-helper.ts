import { MongoClient, Db } from 'mongodb';

export default class MongoHelper {
  public static client: MongoClient;
  public static db: Db;

  public static async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = this.client.db();
  }

  public static async disconnect(): Promise<void> {
    await this.client.close();
  }

  public static async getDb(): Promise<Db> {
    if (!this.client.isConnected()) {
      await this.client.connect();
    }

    return this.db;
  }
}
