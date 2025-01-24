import { app } from './index.ts';
import { PORT } from './util/config';
import connectToDB from './util/db';

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log('Express app is listening on PORT ', PORT);
  });
};

startServer();
