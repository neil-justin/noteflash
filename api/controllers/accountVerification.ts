import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../util/config';

const verifyUser = async (
  req: Request<unknown, unknown, unknown, { token: string }>,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;
  const temp = jwt.verify(token, SECRET);
};

export default { verifyUser };
