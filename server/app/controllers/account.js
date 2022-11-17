const Account = require('../models/user').Account;

exports.getAccounts = async (req, res) => {
  const accounts = await Account.findAll();
  res.status(200).json({ accounts });
}