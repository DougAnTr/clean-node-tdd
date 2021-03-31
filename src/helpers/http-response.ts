import { InternalServerError } from '../errors/internal-server.error';
import { MissingParamError } from '../errors/missing-param.error';
import { UnauthorizedError } from '../errors/unauthorized.error';

interface HttpResponseInterface {
  statusCode: number;
  body?: any;
}

export class HttpResponse {
  static badRequest(error: any): HttpResponseInterface {
    return {
      statusCode: 400,
      body: error,
    };
  }

  static serverError(): HttpResponseInterface {
    return {
      statusCode: 500,
      body: new InternalServerError(),
    };
  }

  static unauthorized(): HttpResponseInterface {
    return {
      statusCode: 401,
      body: new UnauthorizedError(),
    };
  }

  static ok(body: any): HttpResponseInterface {
    return {
      statusCode: 200,
      body,
    };
  }
}
