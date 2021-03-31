import { Request } from 'express';
import { MissingParamError } from '../errors/missing-param.error';
import { HttpResponse } from '../helpers/http-response';

export class LoginRouter {
  constructor(private authUseCase: any) {}

  async route(httpRequest: Request) {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'));
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
