import { Request, Response } from 'express';
import { Router } from '../../interfaces/router-interface';

export class ExpressRouterAdapter {
  static adapt(router: Router) {
    return async (req: Request, res: Response): Promise<void> => {
      const httpRequest = {
        body: req.body,
      };

      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
