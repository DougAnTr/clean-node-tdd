import { MissingParamError } from '../../utils/errors';
import { AuthUseCase } from './auth-usecase';

interface UserInterface {
  password: string;
}
export class LoadUserByEmailRepositorySpy {
  public email = '';
  public user: UserInterface | null = {
    password: 'hashed_password',
  };

  async load(email: string) {
    this.email = email;

    return this.user;
  }
}

export class EncrypterSpy {
  public password = '';
  public hashedPassword = '';
  async compare(password: string, hashedPassword: string) {
    this.password = password;
    this.hashedPassword = hashedPassword;
  }
}

const makeSut = () => {
  const encrypterSpy = new EncrypterSpy();
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpy);

  return { sut, loadUserByEmailRepositorySpy, encrypterSpy };
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
      'valid_email@mail.com',
      'invalid_password',
    );

    expect(accessToken).toBeNull();
  });

  it('Should call Encrypter with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut();
    await sut.auth('valid_email@mail.com', 'any_password');

    expect(encrypterSpy.password).toBe('any_password');
    if (loadUserByEmailRepositorySpy.user) {
      expect(encrypterSpy.hashedPassword).toBe(
        loadUserByEmailRepositorySpy.user.password,
      );
    }
  });
});
