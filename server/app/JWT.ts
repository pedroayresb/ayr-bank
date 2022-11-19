const { sign, verify } = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express';

interface user {
  id: number;
  user_name: string;
  password: string;
  account_id: number;
  createdAt: Date;
  updatedAt: Date;
}


const createTokens = (user: user) => {
  const accessToken: string = sign(
    { id: user.id },
    "ngprojetct",
  );

  return accessToken;
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "User not Authenticated!" });
  }

  try {
    const validToken: string = verify(accessToken, "ngprojetct");
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export { createTokens, validateToken };