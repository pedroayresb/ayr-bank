const User = require('../models/user').User;
const Account = require('../models/user').Account;
const Transaction = require('../models/user').Transaction;

exports.transfer = async (req, res, next) => {
  const { user_name, amount, reciever_name } = req.body;
  const hasUser = await User.findOne({ where: { user_name } });
  const hasReciver = await User.findOne({ where: { user_name: reciever_name } });
  if (!hasUser) {
    res.status(400).json({ message: 'User does not exist' });
  } else if (!hasReciver) {
    res.status(400).json({ message: 'Recipient does not exist' });
  } else if (hasUser.id === hasReciver.id) {
    res.status(400).json({ message: 'You cannot send money to yourself' });
  } else {
    const account = await Account.findOne({ where: { id: hasUser.account_id } });
    if (Number(account.balance) >= Number(amount)) {
      const newSenderBalance = Number(account.balance) - Number(amount);
      await Account.update({ balance: Number(newSenderBalance) }, { where: { id: account.id } });
      const recieverAccount = await Account.findOne({ where: { id: hasReciver.account_id } });
      const newRecieverBalance = Number(recieverAccount.balance) + Number(amount);
      await Account.update({ balance: Number(newRecieverBalance) }, { where: { id: recieverAccount.id } });
      await Transaction.create({ 
        value: Number(amount),
        creditedAccount: hasUser.id,
        debitedAccount: hasReciver.id,
        createdAt: new Date(),
      });
      const newAccount = await Account.findOne({ where: { id: hasUser.account_id } });
      res.status(200).json({ message: 'Transfer Successful', newAccount });
    } else {
      res.status(400).json({ message: 'Insufficient Funds' });
    }
  }
}

exports.getHistory = async (req, res, next) => {
  const { user_name } = req.body;
  const hasUser = await User.findOne({ where: { user_name } });
  if (hasUser) {
    const sendTransactions = await Transaction.findAll({ where: { creditedAccount: hasUser.id } });
    const recieveTransactions = await Transaction.findAll({ where: { debitedAccount: hasUser.id } });
    const transactions = sendTransactions.concat(recieveTransactions);
    res.status(200).json({ transactions });
  } else {
    res.status(400).json({ message: 'User does not exist' });
  }
}

exports.getSendHistory = async (req, res, next) => {
  const { user_name } = req.body;
  const hasUser = await User.findOne({ where: { user_name } });
  if (hasUser) {
    const sendTransactions = await Transaction.findAll({ where: { creditedAccount: hasUser.id } });
    res.status(200).json({ sendTransactions });
  } else {
    res.status(400).json({ message: 'User does not exist' });
  }
}

exports.getRecieveHistory = async (req, res, next) => {
  const { user_name } = req.body;
  const hasUser = await User.findOne({ where: { user_name } });
  if (hasUser) {
    const recieveTransactions = await Transaction.findAll({ where: { debitedAccount: hasUser.id } });
    res.status(200).json({ recieveTransactions });
  } else {
    res.status(400).json({ message: 'User does not exist' });
  }
}

exports.getAllHistory = async (req, res, next) => {
  const transactions = await Transaction.findAll();
  res.status(200).json({ transactions });
}
