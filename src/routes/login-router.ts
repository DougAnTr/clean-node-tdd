import { Request } from 'express';
import { HttpResponse } from '../helpers/http-response';

export class LoginRouter {
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
  }
}
