import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/users.models';
import AccountModel from '../models/accounts.models';
import CryptoJS from 'crypto-js';

const pathToEnv = __dirname.split('/server')[0];

dotenv.config({ path: pathToEnv+'/.env'});

const secret: string = process.env.JWT_SECRET || 'secret';

const registerUser = async (
  username: string,
  password: string,
) => {

  const encryptedPassword = CryptoJS.SHA256(password).toString();

  const account = await AccountModel.create({
    balance: 100,
  });

  const user = await UserModel.create({
    name: username,
    password: encryptedPassword,
    accountId: account.id,
  });
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: 86400,
  });
  return { token };
};

const getAllUsers = async () => {
  const users = await UserModel.findAll();
  return users;
};

const loginUser = async (username: string, password: string) => {
  const encryptedPassword = CryptoJS.SHA256(password).toString();
  const allUsers = await getAllUsers();
  const user = allUsers.find( (u: any) => {
    return u.name === username;
  });
  if (!user) {
    throw new Error('Invalid username');
  }
  if (user.password !== encryptedPassword) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: 86400,
  });
  return { token };
};

const getProfileByName = async (name: string) => {
  const user = await UserModel.findOne({
    where: {
      name,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const getUserById = async (id: number) => {
  const user = await UserModel.findOne({
    where: {
      id,
    },
    include: AccountModel,
  },);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export { registerUser, loginUser, getAllUsers, getProfileByName, getUserById };
