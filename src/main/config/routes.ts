import { Router } from 'express';
import { Application } from 'express-serve-static-core';
import FastGlob from 'fast-glob';
import { resolve } from 'path';

const router = Router();

export const setupRoutes = (app: Application): void => {
  app.use('/api', router);
  FastGlob.sync('**/src/main/routes/**routes.ts').forEach((file) =>
    import(resolve(__dirname, '..', '..', '..', file)).then((route) =>
      route.fc(router),
    ),
  );
};
