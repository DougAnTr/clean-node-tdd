import { MissingParamError } from '../../utils/errors';

class AuthUseCase {
  async auth(email: string) {
    if (!email) {
      throw new MissingParamError('email');
    }
  }
}

describe('Auth UseCase', () => {
  it('Should throw if no email is provided', () => {
    const sut = new AuthUseCase();
    const promise = sut.auth('');

    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });
});
