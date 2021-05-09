import { HttpResponse } from '../../interfaces/http-response-interface';
import { InternalServerError, UnauthorizedError } from '../errors';

export class HttpResponseHelper {
  static badRequest(body: any): HttpResponse {
    return {
      statusCode: 400,
      body,
    };
  }

  static serverError(): HttpResponse {
    return {
      statusCode: 500,
      body: new InternalServerError(),
    };
  }

  static unauthorized(): HttpResponse {
    return {
      statusCode: 401,
      body: new UnauthorizedError(),
    };
  }

  static ok(body: any): HttpResponse {
    return {
      statusCode: 200,
      body,
    };
  }
}
