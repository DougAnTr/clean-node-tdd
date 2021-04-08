import { Request } from 'express';
import { InvalidParamError, MissingParamError } from '../../utils/errors';
import { HttpResponse } from '../helpers/http-response';

export class LoginRouter {
  constructor(private authUseCase: any, private emailValidator: any) {}

  async route(httpRequest: Request) {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'));
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'));
      }

      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'));
      }

      const accessToken = await this.authUseCase.auth(email, password);

      if (!accessToken) {
        return HttpResponse.unauthorized();
      }

      return HttpResponse.ok({ accessToken });
    } catch (e) {
      return HttpResponse.serverError();
    }
  }
}