import jwt from 'jsonwebtoken';

export class TokenGenerator {
  constructor(public secret: string) {}

  async generate(payload: any): Promise<string> {
    return jwt.sign(payload, this.secret);
  }
}
