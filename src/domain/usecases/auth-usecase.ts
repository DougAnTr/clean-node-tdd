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

  async auth(email: string, password: string) {
    if (!email) {
      throw new MissingParamError('email');
    }

    if (!password) {
      throw new MissingParamError('password');
    }

    const user = await this.loadUserByEmailRepository.load(email);

    if (!user) {
      return null;
    }

    const isValid = await this.encrypter.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return await this.tokenGenerator.generate(user.id);
  }
}
