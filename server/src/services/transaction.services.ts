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
  if (!sender) {
    throw new Error('Sender not found');
  }
  if (!receiver) {
    throw new Error('Receiver not found');
  }
  const senderAccount = await AccountModel.findOne({
    where: {
      id: sender.accountId,
    },
  });
  const receiverAccount = await AccountModel.findOne({
    where: {
      id: receiver.accountId,
    },
  });
  if (!senderAccount) {
    throw new Error('Sender account not found');
  }
  if (!receiverAccount) {
    throw new Error('Receiver account not found');
  }
  if (senderAccount.balance < amount) {
    throw new Error('Insufficient balance');
  }
  const senderBalance = senderAccount.balance - amount;
  const receiverBalance = receiverAccount.balance + amount;
  await AccountModel.update(
    {
      balance: senderBalance,
    },
    {
      where: {
        id: sender.accountId,
      },
    },
  );
  await AccountModel.update(
    {
      balance: receiverBalance,
    },
    {
      where: {
        id: receiver.accountId,
      },
    },
  );
  const transaction = await TransactionModel.create({
    debitedAccount: sender.id,
    creditedAccount: receiver.id,
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