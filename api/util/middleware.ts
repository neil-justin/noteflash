import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const { TokenExpiredError } = jwt;

interface ErrorMessage {
  statusCode: number;
  errorMessage: string;
}

// error handler should have these 4 parameters. else it wouln't work as expected
const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);
  if (error instanceof z.ZodError) {
    res.status(400).send(error);
  } else if (error instanceof TokenExpiredError) {
    res.status(410).send(error);
  }
  // } else {
  //   const parsedError: ErrorMessage = JSON.parse(error.message);
  //   res.status(parsedError.statusCode).json(parsedError);
  // }
};

export { errorHandler };
