import { HttpRequest } from './http-request-interface';
import { HttpResponse } from './http-response-interface';

export interface Router {
  route(httpRequest: HttpRequest): Promise<HttpResponse>;
}
