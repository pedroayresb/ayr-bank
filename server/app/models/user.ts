import { Model, DataTypes } from 'sequelize';

import { db } from '../util/database';

interface UserModel extends Model {
  id: number;
  user_name: string;
  password: string;
  account_id: number;
  createdAt: Date;
  updatedAt: Date;
}
interface AccountModel extends Model {
  id: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
interface TransactionModel extends Model {
  id: number;
  value: number;
  creditedAccount: number;
  debitedAccount: number;
  createdAt: Date;
  updatedAt: Date;
}

const User = db.define<UserModel>('users', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_name: DataTypes.STRING,
  password: DataTypes.STRING,
});

const Account = db.define<AccountModel>('accounts', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  balance: DataTypes.INTEGER,
});

const Transaction = db.define<TransactionModel>('transaction', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  value: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
});

User.belongsTo(Account, { foreignKey: 'account_id' });

Transaction.belongsTo(Account, { foreignKey: 'debitedAccount' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccount' });

export { User, Account, Transaction };
