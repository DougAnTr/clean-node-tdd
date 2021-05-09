import MongoHelper from '../infra/helpers/mongo-helper';
import app from './config/app';
import { config } from 'dotenv';

config();
const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL || '';

MongoHelper.connect(mongoUrl)
  .then(() => {
    app.listen(port, () =>
      console.log(`Running application on http://localhost:${port}`),
    );
  })
  .catch(console.error);
