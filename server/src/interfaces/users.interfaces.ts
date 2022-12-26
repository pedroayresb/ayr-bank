import { TransactionsInstance } from '../models/transaction.models';
export interface AccountInterface {
  id: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInterface { 
  id: number;
  name: string;
  password: string;
  accountId: number;
  createdAt: Date;
  updatedAt: Date;
  Account? : AccountInterface;
}
export interface UserWithAccount extends UserInterface {
  account?: AccountInterface;
}

export interface TransactionsWithUser extends TransactionsInstance {
  debitedUser?: UserInterface;
  creditedUser?: UserInterface;
}
