import jwt from 'jsonwebtoken';

export class TokenGenerator {
  constructor(public secret: string) {}

  async generate(id: string) {
    return jwt.sign(id, this.secret);
  }
}
