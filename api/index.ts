import express from 'express';
import { getAuth } from 'firebase/auth';

import userRouter from './routes/user.ts';
import noteRouter from './routes/note.ts';
import { errorHandler } from './util/middleware.ts';
import firebaseApp from './util/firebase.ts';

const app = express();
const firebaseAuth = getAuth(firebaseApp);

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

app.use(errorHandler);

export { app, firebaseAuth };
