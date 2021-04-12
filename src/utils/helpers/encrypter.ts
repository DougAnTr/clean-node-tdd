import bcrypt from 'bcrypt';

export class Encrypter {
  async compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
