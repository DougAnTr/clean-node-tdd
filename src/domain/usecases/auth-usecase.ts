import { MissingParamError } from '../../utils/errors';
import {
  EncrypterSpy,
  LoadUserByEmailRepositorySpy,
} from './auth-usecase.spec';

export class AuthUseCase {
  constructor(
    private loadUserByEmailRepository: LoadUserByEmailRepositorySpy,
    private encrypter: EncrypterSpy,
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

    await this.encrypter.compare(password, user.password);

    return null;
  }
}
