import { Request, Response, NextFunction } from 'express';
import { UserCredential } from '../types';
import userService from '../services/userService';

const registerUser = async (
  req: Request<unknown, unknown, UserCredential>,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.host) {
    try {
      const registeredUser = await userService.registerUser(
        req.headers.host,
        req.body
      );
      res.json(registeredUser);
    } catch (error) {
      next(error);
    }
  }
};

export default { registerUser };
