import { User, Account } from '../models/user';
import * as CryptoJS from 'crypto-js';
import { Request, Response } from 'express';

import { createTokens } from '../JWT';
import { verify } from 'jsonwebtoken';

interface user {
  user_name: string;
  password: string;
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

interface id {
  id: number;
}

interface validToken {
  id: number;
  iat: number;
}

const login = async (req: Request, res: Response) => {
  const { user_name, password }: user = req.body;
  const hashedPassword: string = CryptoJS.SHA256(password).toString();
  const hasUser: hasUser = await User.findOne({ where: { user_name, password: hashedPassword } });
  if (hasUser) {
    const account: account = await Account.findOne({ where: { id: hasUser.account_id } });
    const accessToken: string = createTokens(hasUser);
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });
    res.status(200).json({ hasUser, account, accessToken });
  } else {
    res.status(401).json({ message: 'Username or Password is Incorrect' });
  }
};

const register = async (req: Request, res: Response) => {
  const { user_name, password }: user = req.body;
  const hasUser: hasUser = await User.findOne({ where: { user_name } });
  if (hasUser) {
    res.status(409).json({ message: 'User already exists' });
  } else {
    const hashedPassword: string = CryptoJS.SHA256(password).toString();
    const account: account = await Account.create({ balance: 100 });
    const user: hasUser = await User.create({ user_name, password: hashedPassword, account_id: account.id });
    res.status(200).json({ user, account });
  }

}

const getUsers = async (req: Request, res: Response) => {
  const allUsers = await User.findAll()
  res.status(200).json({ allUsers });
}

const getProfile = async (req: Request, res: Response) => {
  const { user_name } = req.body;
  const user: hasUser = await User.findOne({ where: { user_name } });
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  };
}

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: hasUser = await User.findOne({ where: { id } });
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

const loginWithToken = async (req: Request, res: Response) => {
  const { accessToken } = req.body;
  if (!accessToken) {  
    return res.status(400).json({ error: "User not Authenticated!" });
  }

  const validToken = verify(accessToken, "ngprojetct");
  if (validToken) {
    const hasUser: hasUser = await User.findOne({ where: { id: (validToken as validToken).id } });
    const account: account = await Account.findOne({ where: { id: hasUser.account_id } });
    res.status(200).json({ message: 'User Authenticated!', hasUser, account });
  } else {
    res.status(400).json({ error: "User not Authenticated!" });
  }
}

export { login, register, getUsers, getProfile, getUserById, loginWithToken };