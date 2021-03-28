import { Request } from 'express';
import { MissingParamError } from '../errors/missing-param.error';
import { LoginRouter } from './login-router';

describe('Login Router', () => {
  it('Should return status code 400 if no email is provided', () => {
    const sut = new LoginRouter();

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
    const sut = new LoginRouter();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    } as Request;
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('password'));
  });

  it('Should return status code 500 if no httpRequest is provided', () => {
    const sut = new LoginRouter();

    const httpResponse = sut.route();
    expect(httpResponse?.statusCode).toBe(500);
  });

  it('Should return status code 500 if httpRequest has no body', () => {
    const sut = new LoginRouter();

    const httpRequest = {} as Request;

    const httpResponse = sut.route(httpRequest);
    expect(httpResponse?.statusCode).toBe(500);
  });
});
