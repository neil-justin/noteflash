import express from 'express';
import { PORT } from './util/config';
import connectToDB from './util/db';

const app = express();

app.use(express.json());

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log('Express app is listening on PORT ', PORT);
  });
};

startServer();
