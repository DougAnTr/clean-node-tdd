import { Request } from 'express';
import { HttpResponse } from '../helpers/http-response';

export class LoginRouter {
  constructor(private authUseCase: any) {}

  async route(httpRequest: Request) {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return HttpResponse.badRequest('email');
      }

      if (!password) {
        return HttpResponse.badRequest('password');
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
