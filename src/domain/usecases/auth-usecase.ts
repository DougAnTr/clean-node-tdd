import { MissingParamError } from '../../utils/errors';
import {
  Encrypter,
  LoadUserByEmailRepository,
  TokenGenerator,
  UpdateAccessTokenRepository,
} from './auth-usecase.spec';

export class AuthUseCase {
  constructor(
    private loadUserByEmailRepository: LoadUserByEmailRepository,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator,
    private updateAccessTokenRepository: UpdateAccessTokenRepository,
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
      const accessToken = await this.tokenGenerator.generate(user.id);
      await this.updateAccessTokenRepository.update(user.id, accessToken);

      return accessToken;
    }

    return null;
  }
}
