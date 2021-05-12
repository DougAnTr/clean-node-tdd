import { HttpResponse } from '../../interfaces/http-response-interface';
import { InternalServerError, UnauthorizedError } from '../errors';

export class HttpResponseHelper {
  static badRequest(error: any): HttpResponse {
    return {
      statusCode: 400,
      body: { error: error.message },
    };
  }

  static serverError(): HttpResponse {
    return {
      statusCode: 500,
      body: { error: new InternalServerError().message },
    };
  }

  static unauthorized(): HttpResponse {
    return {
      statusCode: 401,
      body: { error: new UnauthorizedError().message },
    };
  }

  static ok(body: any): HttpResponse {
    return {
      statusCode: 200,
      body,
    };
  }
}
