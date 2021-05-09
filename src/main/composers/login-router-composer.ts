import { AuthUseCase } from '../../domain/usecases/auth-usecase';
import { LoadUserByEmailRepository } from '../../infra/repositories/load-user-by-email-repository';
import { UpdateAccessTokenRepository } from '../../infra/repositories/update-access-token-repository';
import { LoginRouter } from '../../presentation/routes/login-router';
import { EmailValidator } from '../../utils/helpers/email-validator';
import { Encrypter } from '../../utils/helpers/encrypter';
import { TokenGenerator } from '../../utils/helpers/token-generator';

const loadUserByEmailRepository = new LoadUserByEmailRepository();
const encrypter = new Encrypter();
const tokenGenerator = new TokenGenerator(process.env.ENCRYPTER_SECRET || '');
const updateAccessTokenRepository = new UpdateAccessTokenRepository();

const authUseCase = new AuthUseCase(
  loadUserByEmailRepository,
  encrypter,
  tokenGenerator,
  updateAccessTokenRepository,
);
const emailValidator = new EmailValidator();

export const loginRouter = new LoginRouter(authUseCase, emailValidator);
