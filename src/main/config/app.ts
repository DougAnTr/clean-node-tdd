import express from 'express';
import { setupApp } from './setup';

const app: express.Application = express();

setupApp(app);

export default app;
