import { HttpRequest } from '../../interfaces/http-request-interface';
import { HttpResponse } from '../../interfaces/http-response-interface';
import { Router } from '../../interfaces/router-interface';
import { InvalidParamError, MissingParamError } from '../../utils/errors';
import { HttpResponseHelper } from '../helpers/http-response';

export class LoginRouter implements Router {
  constructor(private authUseCase: any, private emailValidator: any) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return HttpResponseHelper.badRequest(new MissingParamError('email'));
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpResponseHelper.badRequest(new InvalidParamError('email'));
      }

      if (!password) {
        return HttpResponseHelper.badRequest(new MissingParamError('password'));
      }

      const accessToken = await this.authUseCase.auth(email, password);

      if (!accessToken) {
        return HttpResponseHelper.unauthorized();
      }

      return HttpResponseHelper.ok({ accessToken });
    } catch (e) {
      return HttpResponseHelper.serverError();
    }
  }
}
