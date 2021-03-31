import { Request } from 'express';
import { InternalServerError } from '../errors/internal-server.error';
import { MissingParamError } from '../errors/missing-param.error';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { LoginRouter } from './login-router';

const makeSut = () => {
  class AuthUseCaseSpy {
    public email: string = '';
    public password: string = '';
    public accessToken: string | null = 'valid_token';

    auth(email: string, password: string) {
      this.email = email;
      this.password = password;

      return this.accessToken;
    }
  }

  const authUseCase = new AuthUseCaseSpy();
  return {
    sut: new LoginRouter(authUseCase),
    authUseCase,
  };
};

describe('Login Router', () => {
  test('Should return status code 400 if no email is provided', () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        password: 'any_password',
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('email'));
  });

  it('Should return status code 400 if no password is provided', () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('password'));
  });

  it('Should return status code 500 if httpRequest has no body', () => {
    const { sut } = makeSut();

    const httpRequest = {} as Request;

    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new InternalServerError());
  });

  it('Shoudl call AuthUseCase with correct params', () => {
    const { sut, authUseCase } = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    } as Request;

    sut.route(httpRequest);
    expect(authUseCase.email).toBe(httpRequest.body.email);
    expect(authUseCase.password).toBe(httpRequest.body.password);
  });

  it('Should return satus code 401 when invalid credentials are provided', () => {
    const { sut, authUseCase } = makeSut();

    authUseCase.accessToken = null;

    const httpRequest = {
      body: {
        email: 'invalid_any_email@email.com',
        password: 'invalid_password',
      },
    } as Request;

    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(401);
    expect(httpResponse?.body).toEqual(new UnauthorizedError());
  });

  it('Should return status code 200 when valid credentials are provided', () => {
    const { sut, authUseCase } = makeSut();

    const httpRequest = {
      body: {
        email: 'valid_any_email@email.com',
        password: 'valid_password',
      },
    } as Request;

    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(200);
    expect(httpResponse?.body.accessToken).toEqual(authUseCase.accessToken);
  });

  it('Should return 500 if AuthUseCase throws an error', () => {
    class AuthUseCaseSpy {
      public accessToken = '';
      auth(email: string, password: string) {
        throw new Error();
      }
    }

    const authUseCaseSpy = new AuthUseCaseSpy();
    authUseCaseSpy.accessToken = 'valid_token';

    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
});
