import express from 'express';
import userRouter from './routes/user.ts';
import accountVerificationRouter from './routes/accountVerification.ts';
import { errorHandler } from './util/middleware.ts';

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/account-verification', accountVerificationRouter);

app.use(errorHandler);

export default app;
