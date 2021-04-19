class LoadUserByEmailRepositorySpec {
  async load(email: string) {
    return null;
  }
}

describe('LoadUserByEmail Repository', () => {
  it('Should return null if no user is found', async () => {
    const sut = new LoadUserByEmailRepositorySpec();
    const user = await sut.load('invalid_email@mail.com');

    expect(user).toBeNull();
  });
});
