const User = require('../models/user').User;
const Account = require('../models/user').Account;
const Transaction = require('../models/user').Transaction;


exports.login = async (req, res, next) => {
  const { user_name, password } = req.body;
  const hasUser = await User.findOne({ where: { user_name, password } })
  if (hasUser) {
    res.status(200).json({ message: 'Login Successful' });
  } else {
    res.status(401).json({ message: 'Login Failed' });
  }
};

exports.register = async (req, res, next) => {
  const { user_name, password } = req.body;
  const hasUser = await User.findOne({ where: { user_name } });
  if (hasUser) {
    res.status(409).json({ message: 'User already exists' });
  } else {
    const account = await Account.create({ balance: 100 });
    const user = await User.create({ user_name, password, account_id: account.id });
    res.status(200).json({ user, account });
  }

}

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error' });
    }
    );
}
