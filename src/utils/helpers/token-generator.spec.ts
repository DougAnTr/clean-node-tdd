import jwt from 'jsonwebtoken';

class TokenGenerator {
  constructor(public secret: string) {}

  async generate(id: string) {
    return jwt.sign(id, this.secret);
  }
}

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

  it('Should call JWT with correct values', async () => {
    const sut = makeSut();
    await sut.generate('any_id');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(jwt.id).toBe('any_id');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(jwt.secret).toBe(sut.secret);
  });
});
