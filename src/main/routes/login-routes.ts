import { Router } from 'express';
import { ExpressRouterAdapter } from '../adapters/express-router-adapter';
import { LoginRouterComposer } from '../composers/login-router-composer';

export const fc = async (router: Router): Promise<void> => {
  const loginRouterComposer = new LoginRouterComposer();
  router.post(
    '/login',
    ExpressRouterAdapter.adapt(loginRouterComposer.compose()),
  );
};

export default fc;
