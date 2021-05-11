import { Router } from 'express';
import { adapt } from '../adapters/express-router-adapter';
import { LoginRouterComposer } from '../composers/login-router-composer';

export const fc = async (router: Router): Promise<void> => {
  router.post('/login', adapt(new LoginRouterComposer().compose()));
};

export default fc;
