import { MissingParamError } from '../../utils/errors';
import { AuthUseCase } from './auth-usecase';

export class LoadUserByEmailRepositorySpy {
  public email = '';
  public user: Object | null = {};

  async load(email: string) {
    this.email = email;

    return this.user;
  }
}

const makeSut = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy);

  return { sut, loadUserByEmailRepositorySpy };
};

describe('Auth UseCase', () => {
  it('Should throw if no email is provided', () => {
    const { sut } = makeSut();
    const promise = sut.auth('', 'any_password');

    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  it('Should throw if no password is provided', () => {
    const { sut } = makeSut();
    const promise = sut.auth('any_email@mail.com', '');

    expect(promise).rejects.toThrow(new MissingParamError('password'));
  });

  it('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();

    await sut.auth('any_email@mail.com', 'any_password');

    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com');
  });

  it('Should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    loadUserByEmailRepositorySpy.user = null;

    const accessToken = await sut.auth(
      'invalid_email@mail.com',
      'any_password',
    );

    expect(accessToken).toBeNull();
  });

  it('Should return null if an invalid password is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    const accessToken = await sut.auth(
      'any_email@mail.com',
      'invalid_password',
    );

    expect(accessToken).toBeNull();
  });
});
