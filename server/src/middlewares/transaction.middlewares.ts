import { Request, Response, NextFunction } from 'express';
import { getProfileByName } from '../services/users.services';
import Account from '../models/accounts.models';

const hasTo = async (req: Request, res: Response, next: NextFunction) => {
  const { to } = req.body;
  if (!to) {
    return res.status(400).json({ error: 'Reciepient is required' });
  };
  if (typeof to !== 'string') {
    return res.status(400).json({ error: 'Reciepient must be a string' });
  };
  const toAcount = await getProfileByName(to);
  if (!toAcount) {
    return res.status(400).json({ error: 'Reciepient does not exist' });
  };
  next();
};

const hasAmount = async (req: Request, res: Response, next: NextFunction) => {
  const { locals: { user } } = res;
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ error: 'amount is required' });
  };
  if (typeof amount !== 'number') {
    return res.status(400).json({ error: 'amount must be a number' });
  };
  const userAccount = await Account.findOne({ where: { id: user.accountId } });
  if (userAccount) {
    if (amount > userAccount.balance) {
      return res.status(400).json({ error: 'Insufficient funds' });
    };
  } else {
    return res.status(400).json({ error: 'Account does not exist' });
  }

  next();
};

export { hasTo, hasAmount };