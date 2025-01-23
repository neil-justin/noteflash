import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET } from '../util/config';
import User from '../models/user';

const verifyUser = async (
  req: Request<unknown, unknown, unknown, { token: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    const decodedToken = jwt.verify(token, SECRET) as JwtPayload;

    if (decodedToken) {
      await User.findOneAndUpdate(
        { email: decodedToken.email },
        { isVerfied: true }
      );
      res.send('Your account is now verified');
    }
  } catch (error) {
    next(error);
  }
};

export default { verifyUser };
