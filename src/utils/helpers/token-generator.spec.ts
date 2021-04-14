import jwt from 'jsonwebtoken';

class TokenGenerator {
  async generate(id: string) {
    return jwt.sign(id, 'secret');
  }
}

const makeSut = () => {
  return new TokenGenerator();
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
});
