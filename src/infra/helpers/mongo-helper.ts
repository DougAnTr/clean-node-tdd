import { MongoClient, Db } from 'mongodb';

export default class MongoHelper {
  public static client: MongoClient;
  public static db: Db;
  private static uri = '';

  public static async connect(uri: string): Promise<void> {
    this.uri = uri;

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
    if (!this.client || !this.client.isConnected()) {
      await MongoHelper.connect(this.uri);
    }

    return this.db;
  }
}
