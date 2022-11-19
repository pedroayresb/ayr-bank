import { Request, Response, NextFunction } from 'express';

interface user {
  user_name: string;
  password: string;
}

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { user_name, password }: user = req.body;

  if (!user_name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (user_name.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long' });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 8 characters' });
  }

  next();
}

export { validateRegister };
