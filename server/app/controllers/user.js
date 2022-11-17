const User = require('../models/user').User;
const Account = require('../models/user').Account;
const CryptoJS = require("crypto-js");

const { createTokens } = require('../JWT');


exports.login = async (req, res, next) => {
  const { user_name, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();
  const hasUser = await User.findOne({ where: { user_name, password: hashedPassword } });
  if (hasUser) {
    const account = await Account.findOne({ where: { id: hasUser.account_id } });
    res.cookie('accessToken', createTokens(hasUser), {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });
    res.status(200).json({ hasUser, account });
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
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const account = await Account.create({ balance: 100 });
    const user = await User.create({ user_name, password: hashedPassword, account_id: account.id });
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

exports.getProfile = (req, res, next) => {
  const { user_name } = req.body;
  User.findOne({ where: { user_name } })
    .then(user => {
      res.status(200).json({ user });
    }
    )
    .catch(err => {
      res.status(500).json({ message: 'Error' });
    }
  );
}
