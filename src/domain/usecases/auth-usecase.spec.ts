import { MissingParamError } from '../../utils/errors';

class LoadUserByEmailRepositorySpy {
  public email = '';

  async load(email: string) {
    this.email = email;
  }
}

class AuthUseCase {
  constructor(
    private loadUserByEmailRepository: LoadUserByEmailRepositorySpy,
  ) {}

  async auth(email: string, password: string) {
    if (!email) {
      throw new MissingParamError('email');
    }

    if (!password) {
      throw new MissingParamError('password');
    }

    await this.loadUserByEmailRepository.load(email);
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
});
