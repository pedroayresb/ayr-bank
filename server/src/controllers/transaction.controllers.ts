import { Request, Response } from 'express';
import {
  createTransaction,
  getAllTransactions,
  getCreditedTransactions,
  getDebitedTransactions,
} from '../services/transaction.services';
import { getProfileByName } from '../services/users.services';

const transfer = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  const { amount, to } = req.body;
  try {
    const toId = await getProfileByName(to);
    const transaction = await createTransaction(user.id, toId.id, amount);
    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getHistory = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  try {
    const transactions = await getAllTransactions(user.id);
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getSendHistory = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  try {
    const transactions = await getDebitedTransactions(user.id);
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getReceiveHistory = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  try {
    const transactions = await getCreditedTransactions(user.id);
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { transfer, getHistory, getSendHistory, getReceiveHistory };
