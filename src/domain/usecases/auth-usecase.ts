import { MissingParamError } from '../../utils/errors';
import {
  EncrypterSpy,
  LoadUserByEmailRepositorySpy,
  TokenGeneratorSpy,
} from './auth-usecase.spec';

export class AuthUseCase {
  constructor(
    private loadUserByEmailRepository: LoadUserByEmailRepositorySpy,
    private encrypter: EncrypterSpy,
    private tokenGenerator: TokenGeneratorSpy,
  ) {}

  async auth(email: string, password: string): Promise<string | null> {
    if (!email) {
      throw new MissingParamError('email');
    }

    if (!password) {
      throw new MissingParamError('password');
    }

    const user = await this.loadUserByEmailRepository.load(email);

    if (user && (await this.encrypter.compare(password, user.password))) {
      return await this.tokenGenerator.generate(user.id);
    }

    return null;
  }
}
