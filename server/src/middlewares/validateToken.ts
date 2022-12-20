import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'secret';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateToken;