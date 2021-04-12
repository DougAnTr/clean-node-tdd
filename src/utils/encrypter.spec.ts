import bcrypt from 'bcrypt';

class Encrypter {
  async compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}

const makeSut = () => {
  return new Encrypter();
};

describe('Encrypter', () => {
  it('Should return true if bcrypt returns true', async () => {
    const sut = makeSut();
    const isValid = await sut.compare('any_value', 'hashed_value');

    expect(isValid).toBe(true);
  });

  it('Should return false if bcrypt returns false', async () => {
    const sut = makeSut();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    bcrypt.isValid = false;
    const isValid = await sut.compare('any_value', 'hashed_value');

    expect(isValid).toBe(false);
  });

  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut();
    await sut.compare('any_value', 'hashed_value');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(bcrypt.value).toBe('any_value');
    expect(bcrypt.hash).toBe('hashed_value');
  });
});
