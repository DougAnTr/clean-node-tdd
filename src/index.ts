import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('It workasas!')
})

const port = 3000;

app.listen(port, () => {
  console.log(`Application running on http://localhost:${port}`)
})
