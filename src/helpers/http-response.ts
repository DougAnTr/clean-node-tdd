import { MissingParamError } from '../errors/missing-param.error';

interface HttpResponseInterface {
  statusCode: number;
  body?: Object;
}

export class HttpResponse {
  static badRequest(paramName: string): HttpResponseInterface {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static serverError(): HttpResponseInterface {
    return {
      statusCode: 500,
    };
  }
}
