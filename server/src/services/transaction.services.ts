import AccountModel from '../models/accounts.models';
import TransactionModel from '../models/transaction.models';
import UserModel from '../models/users.models';
import { Op } from 'sequelize';

const createTransaction = async (
  from: number,
  to: number,
  amount: number,
) => {
  const sender = await UserModel.findOne({
    where: {
      id: from,
    },
  });
  const receiver = await UserModel.findOne({
    where: {
      id: to,
    },
  });
  const senderAccount = await AccountModel.findOne({
    where: {
      id: sender!.accountId,
    },
  });
  const receiverAccount = await AccountModel.findOne({
    where: {
      id: receiver!.accountId,
    },
  });
  const senderBalance = senderAccount!.balance - amount;
  const receiverBalance = receiverAccount!.balance + amount;
  await AccountModel.update(
    {
      balance: senderBalance,
    },
    {
      where: {
        id: sender!.accountId,
      },
    },
  );
  await AccountModel.update(
    {
      balance: receiverBalance,
    },
    {
      where: {
        id: receiver!.accountId,
      },
    },
  );
  const transaction = await TransactionModel.create({
    debitedAccount: sender!.id,
    creditedAccount: receiver!.id,
    value: amount,
    createdAt: new Date(),
  });
  return transaction;
};

const getAllTransactions = async (id: number) => {
  const transactions = await TransactionModel.findAll({
    where: {
      [Op.or]: [{ debitedAccount: id }, { creditedAccount: id }],
    },
  });
  return transactions;
};

const getCreditedTransactions = async (id: number) => {
  const transactions = await TransactionModel.findAll({
    where: {
      creditedAccount: id,
    },
  });
  return transactions;
};

const getDebitedTransactions = async (id: number) => {
  const transactions = await TransactionModel.findAll({
    where: {
      debitedAccount: id,
    },
  });
  return transactions;
};

export {
  createTransaction,
  getAllTransactions,
  getCreditedTransactions,
  getDebitedTransactions,
};