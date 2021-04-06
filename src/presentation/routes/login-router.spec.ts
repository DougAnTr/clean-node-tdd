import { Request } from 'express';
import { InternalServerError, UnauthorizedError } from '../errors';
import { MissingParamError, InvalidParamError } from '../../utils/errors';
import { LoginRouter } from './login-router';

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    public isEmailValid = true;
    public email = '';

    isValid(email: string) {
      this.email = email;
      return this.isEmailValid;
    }
  }

  return new EmailValidatorSpy();
};

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    public email: string = '';
    public password: string = '';
    public accessToken: string | null = 'valid_token';

    async auth(email: string, password: string) {
      this.email = email;
      this.password = password;

      return this.accessToken;
    }
  }
  return new AuthUseCaseSpy();
};

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCase();
  const emailValidatorSpy = makeEmailValidator();

  return {
    sut: new LoginRouter(authUseCaseSpy, emailValidatorSpy),
    authUseCaseSpy,
    emailValidatorSpy,
  };
};

describe('Login Router', () => {
  test('Should return status code 400 if no email is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        password: 'any_password',
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('email'));
  });

  it('Should return status code 400 if no password is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('password'));
  });

  it('Should return status code 500 if httpRequest has no body', async () => {
    const { sut } = makeSut();

    const httpRequest = {} as Request;

    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  it('Shoudl call AuthUseCase with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    } as Request;

    await sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  it('Should return status code 401 when invalid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut();

    authUseCaseSpy.accessToken = null;

    const httpRequest = {
      body: {
        email: 'invalid_any_email@email.com',
        password: 'invalid_password',
      },
    } as Request;

    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(401);
    expect(httpResponse?.body).toEqual(new UnauthorizedError());
  });

  it('Should return status code 200 when valid credentials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut();

    const httpRequest = {
      body: {
        email: 'valid_any_email@email.com',
        password: 'valid_password',
      },
    } as Request;

    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(200);
    expect(httpResponse?.body.accessToken).toEqual(authUseCaseSpy.accessToken);
  });

  it('Should return 500 if AuthUseCase throws an error', async () => {
    class AuthUseCaseSpy {
      public accessToken = '';
      async auth(email: string, password: string) {
        throw new Error();
      }
    }

    const emailValidatorSpy = makeEmailValidator();
    const authUseCaseSpy = new AuthUseCaseSpy();
    authUseCaseSpy.accessToken = 'valid_token';

    const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy);
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });

  it('Should return status code 400 if invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;

    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'any_password',
      },
    } as Request;

    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new InvalidParamError('email'));
  });

  it('Should return 500 if EmailValidator throws an error', async () => {
    class EmailValidatorSpy {
      public isEmailValid = true;

      isValid(email: string) {
        throw new Error();
      }
    }

    const authUseCaseSpy = makeAuthUseCase();
    authUseCaseSpy.accessToken = 'valid_token';

    const sut = new LoginRouter(authUseCaseSpy, new EmailValidatorSpy());
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    } as Request;
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });

  it('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSpy } = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    } as Request;

    await sut.route(httpRequest);
    expect(emailValidatorSpy.email).toBe(httpRequest.body.email);
  });
});
