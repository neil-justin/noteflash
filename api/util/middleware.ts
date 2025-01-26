import { Request, Response, NextFunction } from 'express';
import { FirebaseError } from 'firebase/app';
import { MongooseError } from 'mongoose';
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
  } else if (error instanceof MongooseError) {
    res.status(409).send({ name: error.name, message: error.message });
  } else if (error instanceof FirebaseError) {
    res.status(403).send(error);
  }
};

export { errorHandler };
