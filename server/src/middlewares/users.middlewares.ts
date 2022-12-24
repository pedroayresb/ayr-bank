import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../interfaces/users.interfaces';
import { getProfileByName } from '../services/users.services';

const validateUsername = (req: Request, res: Response, next: NextFunction) => {
  const { name }: UserInterface = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Username is required' });
  };
  if (name.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  };
  if(typeof name !== 'string') {
    return res.status(400).json({ error: 'Username must be a string' });
  };

  next();
};

const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name }: UserInterface = req.body;
  try {
    await getProfileByName(name);
    return res.status(400).json({ error: 'Username already exists' });
  } catch (error: any) {
    next();
  };
}

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password }: UserInterface = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  };
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  };
  if(typeof password !== 'string') {
    return res.status(400).json({ error: 'Password must be a string' });
  };

  next();
}

export { validateUsername, validateRegister, validatePassword };



