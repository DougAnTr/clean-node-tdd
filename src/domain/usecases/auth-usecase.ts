import { LoadUserByEmailRepository } from '../../infra/repositories/load-user-by-email-repository';
import { UpdateAccessTokenRepository } from '../../infra/repositories/update-access-token-repository';
import { Encrypter } from '../../utils/helpers/encrypter';
import { TokenGenerator } from '../../utils/helpers/token-generator';

export class AuthUseCase {
  constructor(
    private loadUserByEmailRepository: LoadUserByEmailRepository,
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator,
    private updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(email: string, password: string): Promise<string | null> {
    const user = await this.loadUserByEmailRepository.load(email);

    if (user && (await this.encrypter.compare(password, user.password))) {
      const accessToken = await this.tokenGenerator.generate(user.id);
      await this.updateAccessTokenRepository.update(user.id, accessToken);

      return accessToken;
    }

    return null;
  }
}
