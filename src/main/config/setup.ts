import express from 'express';

export const setupApp = (app: express.Application): void => {
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.set('access-control-allow-origin', '*');
    res.set('access-control-allow-methods', '*');
    res.set('access-control-allow-headers', '*');

    next();
  });
};
