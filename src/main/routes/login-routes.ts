import { Router } from 'express';
import { ExpressRouterAdapter } from '../adapters/express-router-adapter';
import { loginRouter } from '../composers/login-router-composer';

export const fc = async (router: Router): Promise<void> => {
  router.post('/login', ExpressRouterAdapter.adapt(loginRouter));
};

export default fc;
