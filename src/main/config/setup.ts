import express from 'express';

export const setupApp = (app: express.Application): void => {
  app.disable('x-powered-by');
};
