import { jest } from '@jest/globals';

jest.mock('jsonwebtoken', () => ({
  token: 'any_token',
  payload: {},
  secret: '',

  sign(payload: any, secret: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.payload = payload;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.secret = secret;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.token;
  },
}));

import jwt from 'jsonwebtoken';
import { TokenGenerator } from './token-generator';

const makeSut = () => {
  return new TokenGenerator('secret');
};

describe('Token Generator', () => {
  it('Should return null if JWT returns null', async () => {
    const sut = makeSut();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jwt.token = null;
    const token = await sut.generate('any_id');

    expect(token).toBeNull();
  });

  it('Should return a token if JWT returns token', async () => {
    const sut = makeSut();
    const token = await sut.generate('any_id');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(token).toBe(jwt.token);
  });

  it('Should call JWT with correct payload', async () => {
    const sut = makeSut();
    await sut.generate({ id: 'any_id' });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(jwt.payload).toEqual({ id: 'any_id' });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(jwt.secret).toBe(sut.secret);
  });
});
