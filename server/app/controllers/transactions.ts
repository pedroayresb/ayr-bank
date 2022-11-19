import { User, Account, Transaction } from '../models/user';;
import { Request, Response } from 'express';

interface user {
  user_name: string;
}

interface hasUser {
  id: number;
  user_name: string;
  password: string;
  account_id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface account {
  id: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

interface transferRequest {
  user_name: string;
  amount: number;
  reciever_name: string;
}

interface transaction {
  id: number;
  value: number;
  creditedAccount: number;
  debitedAccount: number;
  createdAt: Date;
  updatedAt: Date;
}[]

const transfer = async (req: Request, res: Response) => {
  const { user_name, amount, reciever_name }: transferRequest = req.body;
  const hasUser: hasUser = await User.findOne({ where: { user_name } });
  const hasReciver: hasUser = await User.findOne({ where: { user_name: reciever_name } });
  const account: account = await Account.findOne({ where: { id: hasUser.account_id } });
  if (hasUser === null) {
    res.status(400).json({ message: 'User does not exist' });
  } else if (hasReciver === null) {
    res.status(400).json({ message: 'Recipient does not exist' });
  } else if (hasUser.id === hasReciver.id) {
    res.status(400).json({ message: 'You cannot send money to yourself' });
  } else if (Number(amount) <= 0) {
    res.status(400).json({ message: 'Amount must be greater than 0' });
  } else if (Number(amount) <= account.balance) {
    const newSenderBalance: number = Number(account.balance) - Number(amount);
    await Account.update({ balance: Number(newSenderBalance) }, { where: { id: account.id } });
    const recieverAccount: account = await Account.findOne({ where: { id: hasReciver.account_id } });
    const newRecieverBalance: number = Number(recieverAccount.balance) + Number(amount);
    await Account.update({ balance: Number(newRecieverBalance) }, { where: { id: recieverAccount.id } });
    await Transaction.create({ 
      value: Number(amount),
      creditedAccount: hasUser.id,
      debitedAccount: hasReciver.id,
      createdAt: new Date(),
    });
    const newAccount: account = await Account.findOne({ where: { id: hasUser.account_id } });
    res.status(200).json({ message: 'Transfer Successful', newAccount });
  } else if (Number(amount) > account.balance) {
    res.status(400).json({ message: 'Insufficient Funds' });
  }
}

const getHistory = async (req: Request, res: Response) => {
  const { user_name }: user = req.body;
  const hasUser: hasUser = await User.findOne({ where: { user_name } });
  if (hasUser) {
    const sendTransactions: transaction = await Transaction.findAll({ where: { creditedAccount: hasUser.id } });
    const recieveTransactions: transaction = await Transaction.findAll({ where: { debitedAccount: hasUser.id } });
    const transactions: transaction = sendTransactions.concat(recieveTransactions);
    res.status(200).json({ transactions });
  } else {
    res.status(400).json({ message: 'User does not exist' });
  }
}

const getSendHistory = async (req: Request, res: Response) => {
  const { user_name }: user = req.body;
  const hasUser: hasUser = await User.findOne({ where: { user_name } });
  if (hasUser) {
    const sendTransactions: transaction = await Transaction.findAll({ where: { creditedAccount: hasUser.id } });
    res.status(200).json({ sendTransactions });
  } else {
    res.status(400).json({ message: 'User does not exist' });
  }
}

const getRecieveHistory = async (req: Request, res: Response) => {
  const { user_name }: user = req.body;
  const hasUser: hasUser = await User.findOne({ where: { user_name } });
  if (hasUser) {
    const recieveTransactions: transaction = await Transaction.findAll({ where: { debitedAccount: hasUser.id } });
    res.status(200).json({ recieveTransactions });
  } else {
    res.status(400).json({ message: 'User does not exist' });
  }
}

const getAllHistory = async (req: Request, res: Response) => {
  const transactions: transaction = await Transaction.findAll();
  res.status(200).json({ transactions });
}

export { transfer, getHistory, getSendHistory, getRecieveHistory, getAllHistory };