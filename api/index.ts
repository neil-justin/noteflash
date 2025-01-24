import express from 'express';
import userRouter from './routes/user.ts';
import { errorHandler } from './util/middleware.ts';
import { getAuth } from 'firebase/auth';
import firebaseApp from './util/firebase.ts';

const app = express();
const firebaseAuth = getAuth(firebaseApp);

app.use(express.json());

app.use('/api/users', userRouter);

app.use(errorHandler);

export { app, firebaseAuth };
