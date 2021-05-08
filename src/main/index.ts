import app from './config/app';

const port = 4000;
app.listen(port, () =>
  console.log(`Running application on http://localhost:${port}`),
);
