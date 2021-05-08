import express from 'express';
import { cors } from '../middlewares/cors';

export const setupApp = (app: express.Application): void => {
  app.disable('x-powered-by');
  app.use(cors);
};
