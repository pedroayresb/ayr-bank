const User = require('../models/user').User;
const Account = require('../models/user').Account;
const CryptoJS = require("crypto-js");

const { createTokens } = require('../JWT');
const { verify } = require("jsonwebtoken");


exports.login = async (req, res, next) => {
  const { user_name, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();
  const hasUser = await User.findOne({ where: { user_name, password: hashedPassword } });
  if (hasUser) {
    const account = await Account.findOne({ where: { id: hasUser.account_id } });
    const accessToken = createTokens(hasUser);
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      SameSite: 'Strict',
    });
    res.status(200).json({ hasUser, account, accessToken });
  } else {
    res.status(401).json({ message: 'Username or Password is Incorrect' });
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

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

exports.loginWithToken = async (req, res, next) => {
  const { accessToken } = req.body;
  console.log(accessToken);

  if (!accessToken) {
    return res.status(400).json({ error: "User not Authenticated!" });
  }

  const validToken = verify(accessToken, "ngprojetct");
  if (validToken) {
    const hasUser = await User.findOne({ where: { id: validToken.id } });
    const account = await Account.findOne({ where: { id: hasUser.account_id } });
    res.status(200).json({ message: 'User Authenticated!', hasUser, account });
  }
}
