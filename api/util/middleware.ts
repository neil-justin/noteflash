import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MongooseError } from 'mongoose';
import { z } from 'zod';

const { TokenExpiredError } = jwt;

// error handler should have these 4 parameters. else it wouln't work as expected
const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send(error);
  } else if (error instanceof TokenExpiredError) {
    res.status(410).send(error);
  } else if (error instanceof MongooseError) {
    res.status(409).send({ name: error.name, message: error.message });
  }
};

export { errorHandler };
