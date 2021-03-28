import { Request } from 'express';
import { HttpResponse } from '../helpers/http-response';
import { AuthUseCaseSpy } from './login-router.test';

export class LoginRouter {
  constructor(private authUseCase: AuthUseCaseSpy) {}

  route(httpRequest?: Request) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError();
    }

    const { email, password } = httpRequest.body;

    if (!email) {
      return HttpResponse.badRequest('email');
    }

    if (!password) {
      return HttpResponse.badRequest('password');
    }

    this.authUseCase.auth(email, password);

    return {
      statusCode: 401,
    };
  }
}
