import AccountModel from '../models/accounts.models';
import TransactionModel from '../models/transaction.models';
import { UserWithAccount, TransactionsWithUser } from '../interfaces/users.interfaces';
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
    include: AccountModel,
  }) as UserWithAccount | null;
  const receiver = await UserModel.findOne({
    where: {
      id: to,
    },
    include: AccountModel,
  }) as UserWithAccount | null;
  const senderBalance = Number(sender!.Account!.balance - amount).toFixed(2);
  const receiverBalance = Number(receiver!.Account!.balance + amount).toFixed(2); 
  await AccountModel.update(
    {
      balance: Number(senderBalance),
    },
    {
      where: {
        id: sender!.accountId,
      },
    },
  );
  await AccountModel.update(
    {
      balance: Number(receiverBalance),
    },
    {
      where: {
        id: receiver!.accountId,
      },
    },
  );
  const transaction = await TransactionModel.create({
    debitedAccount: sender!.accountId,
    creditedAccount: receiver!.accountId,
    value: Number(amount),
  });

  return transaction;
};

const getCreditedTransactions = async (id: number) => {
  const transactions = await TransactionModel.findAll({
    where: {
      creditedAccount: id,
    },
  });
  const withUserNames = await Promise.all(
    transactions.map(async (transaction) => {
      const sender = await UserModel.findOne({
        where: {
          id: transaction.debitedAccount,
        },
      });
      const receiver = await UserModel.findOne({
        where: {
          id: transaction.creditedAccount,
        },
      });
      const transactionWithUserNames = {
        ...transaction.toJSON(),
        sender: sender!.name,
        receiver: receiver!.name,
      };
      return transactionWithUserNames;
    }),
  );
  return withUserNames;
};

const getDebitedTransactions = async (id: number) => {
  const transactions = await TransactionModel.findAll({
    where: {
      debitedAccount: id,
    }
  });
  const withUserNames = await Promise.all(
    transactions.map(async (transaction) => {
      const sender = await UserModel.findOne({
        where: {
          id: transaction.debitedAccount,
        },
      });
      const receiver = await UserModel.findOne({
        where: {
          id: transaction.creditedAccount,
        },
      });
      const transactionWithUserNames = {
        ...transaction.toJSON(),
        sender: sender!.name,
        receiver: receiver!.name,
      };
      return transactionWithUserNames;
    }),
  );
  return withUserNames;
};

const getLastDebitedTransaction = async (id: number) => {
  const transaction = await TransactionModel.findOne({
    where: {
      debitedAccount: id,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: 1,
  });
  const sender = await UserModel.findOne({
    where: {
      id: transaction!.debitedAccount,
    },
  });
  const receiver = await UserModel.findOne({
    where: {
      id: transaction!.creditedAccount,
    },
  });
  const transactionWithUserNames = {
    ...transaction!.toJSON(),
    sender: sender!.name,
    receiver: receiver!.name,
  };
  return transactionWithUserNames;
};

const getLastCreditedTransaction = async (id: number) => {
  const transaction = await TransactionModel.findOne({
    where: {
      creditedAccount: id,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: 1,
  });
  const sender = await UserModel.findOne({
    where: {
      id: transaction!.debitedAccount,
    },
  });
  const receiver = await UserModel.findOne({
    where: {
      id: transaction!.creditedAccount,
    },
  });
  const transactionWithUserNames = {
    ...transaction!.toJSON(),
    sender: sender!.name,
    receiver: receiver!.name,
  };
  return transactionWithUserNames;
};

const getAllTransactions = async (id: number) => {
  const transactions = await TransactionModel.findAll({
    where: {
      [Op.or]: [
        { debitedAccount: id },
        { creditedAccount: id },
      ],
    },
  });
  const withUserNames = await Promise.all(
    transactions.map(async (transaction) => {
      const sender = await UserModel.findOne({
        where: {
          id: transaction.debitedAccount,
        },
      });
      const receiver = await UserModel.findOne({
        where: {
          id: transaction.creditedAccount,
        },
      });
      const transactionWithUserNames = {
        ...transaction.toJSON(),
        sender: sender!.name,
        receiver: receiver!.name,
      };
      return transactionWithUserNames;
    }),
  );
  return withUserNames;
};

export {
  createTransaction,
  getAllTransactions,
  getCreditedTransactions,
  getDebitedTransactions,
  getLastCreditedTransaction,
  getLastDebitedTransaction,
};