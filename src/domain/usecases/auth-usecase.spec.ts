import { MissingParamError } from '../../utils/errors';

class AuthUseCase {
  async auth(email: string, password: string) {
    if (!email) {
      throw new MissingParamError('email');
    }

    if (!password) {
      throw new MissingParamError('password');
    }
  }
}

describe('Auth UseCase', () => {
  it('Should throw if no email is provided', () => {
    const sut = new AuthUseCase();
    const promise = sut.auth('', 'any_password');

    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  it('Should throw if no password is provided', () => {
    const sut = new AuthUseCase();
    const promise = sut.auth('any_email@mail.com', '');

    expect(promise).rejects.toThrow(new MissingParamError('password'));
  });
});
