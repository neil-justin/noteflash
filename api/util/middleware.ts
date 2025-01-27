import { Request, Response, NextFunction } from 'express';
import { FirebaseError } from 'firebase/app';
import { z } from 'zod';

// error handler should have these 4 parameters. else it wouln't work as expected
const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send(error);
  } else if (error instanceof FirebaseError) {
    if (error.code === 'auth/email-already-exists') {
      res.status(409).send(error);
    } else if (error.code === 'auth/weak-password') {
      res.status(403).send(error);
    }
  }
};

export { errorHandler };
