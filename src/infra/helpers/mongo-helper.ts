import { MongoClient, Db } from 'mongodb';

export default class MongoHelper {
  public static client: MongoClient;
  public static db: Db;
  private static uri: string;
  private static dbName = '';

  public static async connect(uri: string, dbName = ''): Promise<void> {
    this.uri = uri;
    this.dbName = dbName;

    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = this.client.db(dbName);
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
