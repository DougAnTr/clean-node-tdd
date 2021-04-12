class Encrypter {
  async compare(password: string, hashedPassword: string) {
    return true;
  }
}

describe('Encrypter', () => {
  it('Should return true if bcrypt returns true', async () => {
    const sut = new Encrypter();
    const isValid = await sut.compare('any_password', 'hashed_password');

    expect(isValid).toBe(true);
  });
});
