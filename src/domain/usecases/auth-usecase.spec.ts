import { MissingParamError } from '../../utils/errors';
import { AuthUseCase } from './auth-usecase';

interface UserInterface {
  id: string;
  password: string;
}
export class LoadUserByEmailRepositorySpy {
  public email = '';
  public user: UserInterface | null = {
    id: 'any_id',
    password: 'hashed_password',
  };

  async load(email: string) {
    this.email = email;

    return this.user;
  }
}

export class TokenGeneratorSpy {
  public userId = '';
  public accessToken = 'any_token';
  async generate(userId: string) {
    this.userId = userId;

    return this.accessToken;
  }
}

export class EncrypterSpy {
  public password = '';
  public hashedPassword = '';
  public isValid = true;

  async compare(password: string, hashedPassword: string) {
    this.password = password;
    this.hashedPassword = hashedPassword;

    return this.isValid;
  }
}

const makeSut = () => {
  const tokenGeneratorSpy = new TokenGeneratorSpy();
  const encrypterSpy = new EncrypterSpy();
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUseCase(
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGeneratorSpy,
  );

  return { sut, loadUserByEmailRepositorySpy, encrypterSpy, tokenGeneratorSpy };
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
    const { sut, encrypterSpy } = makeSut();
    encrypterSpy.isValid = false;

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

  it('Should call TokenGenerator with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, tokenGeneratorSpy } = makeSut();
    await sut.auth('valid_email@mail.com', 'valid_password');

    if (loadUserByEmailRepositorySpy.user) {
      expect(tokenGeneratorSpy.userId).toBe(
        loadUserByEmailRepositorySpy.user.id,
      );
    }
  });
});
