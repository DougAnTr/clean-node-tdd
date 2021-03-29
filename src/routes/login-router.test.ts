import { Request } from 'express';
import { MissingParamError } from '../errors/missing-param.error';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { LoginRouter } from './login-router';

export class AuthUseCaseSpy {
  public email: string = '';
  public password: string = '';

  auth(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

const makeSut = () => {
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

  it('Shoudl 401 when ivalid credentials are provided', () => {
    const { sut } = makeSut();

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
});
