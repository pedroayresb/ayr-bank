import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/config';
import Account from './accounts.models';

interface TransactionsAttributes {
  id: number;
  debitedAccount: number;
  creditedAccount: number;
  value: number;
  createdAt: Date;
}

interface TransactionsCreationAttributes extends Optional<TransactionsAttributes, 'id'> {}
interface TransactionsInstance extends Model<TransactionsAttributes, TransactionsCreationAttributes>, TransactionsAttributes {}

const Transactions = sequelize.define<TransactionsInstance>('Transactions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  debitedAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: 'id',
    },
  },
  creditedAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: 'id',
    },
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Transactions;