import { Request, Response, NextFunction } from 'express';
import { UserCredentialSchema } from './schema';

const parseUserCredential = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    UserCredentialSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export { parseUserCredential };
