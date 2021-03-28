import express from 'express';

class App {
  private server;
  private port;

  constructor() {
    this.server = express();
    this.port = 3000;
  }

  init() {
    this.server.listen(this.port, () => {
      console.log(`Application running on http://localhost:${this.port}`);
    });
  }
}

const app = new App();
app.init();
