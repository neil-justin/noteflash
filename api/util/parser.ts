import { Request, Response, NextFunction } from 'express';
import { NewUserSchema } from './schema';

const parseNewUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export { parseNewUser };
