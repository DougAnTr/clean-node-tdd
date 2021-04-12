import { MissingParamError } from '../../utils/errors';
import { AuthUseCase } from './auth-usecase';
import { UserType } from '../../interfaces/user.interface';

export class LoadUserByEmailRepository {
  public email = '';
  public user: UserType = {
    id: 'any_id',
    password: 'hashed_password',
  };

  async load(email: string): Promise<UserType> {
    this.email = email;

    return this.user;
  }
}

export class TokenGenerator {
  public userId = '';
  public accessToken = 'any_token';
  async generate(userId: string): Promise<string> {
    this.userId = userId;

    return this.accessToken;
  }
}

export class Encrypter {
  public password = '';
  public hashedPassword = '';
  public isValid = true;

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    this.password = password;
    this.hashedPassword = hashedPassword;

    return this.isValid;
  }
}

export class UpdateAccessTokenRepository {
  public userId = '';
  public accessToken = '';

  async update(userId: string, accessToken: string): Promise<void> {
    this.userId = userId;
    this.accessToken = accessToken;
  }
}

const makeSut = () => {
  const tokenGeneratorSpy = new TokenGenerator();
  const encrypterSpy = new Encrypter();
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepository();
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepository();
  const sut = new AuthUseCase(
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy,
  );

  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy,
  };
};

describe('Auth UseCase', () => {
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

  it('Should return an accessToken if correct credentials are provided', async () => {
    const { sut, tokenGeneratorSpy } = makeSut();
    const accessToken = await sut.auth(
      'valid_email@mail.com',
      'valid_password',
    );

    expect(accessToken).toBe(tokenGeneratorSpy.accessToken);
    expect(accessToken).toBeTruthy();
  });

  it('Should call UpdateAccessTokenRepository with correct values', async () => {
    const {
      sut,
      loadUserByEmailRepositorySpy,
      tokenGeneratorSpy,
      updateAccessTokenRepositorySpy,
    } = makeSut();
    await sut.auth('valid_email@mail.com', 'valid_password');

    if (loadUserByEmailRepositorySpy.user) {
      expect(updateAccessTokenRepositorySpy.userId).toBe(
        loadUserByEmailRepositorySpy.user.id,
      );
      expect(updateAccessTokenRepositorySpy.accessToken).toBe(
        tokenGeneratorSpy.accessToken,
      );
    }
  });
});
