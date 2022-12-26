import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/config';
import Account from './accounts.models';
import User from './users.models';

interface TransactionsAttributes {
  id: number;
  debitedAccount: number;
  creditedAccount: number;
  value: number;
}

interface TransactionsCreationAttributes extends Optional<TransactionsAttributes, 'id'> {}
export interface TransactionsInstance extends Model<TransactionsAttributes, TransactionsCreationAttributes>, TransactionsAttributes {}

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
});

Transactions.belongsTo(User, { foreignKey: 'debitedAccount' });
Transactions.belongsTo(User, { foreignKey: 'creditedAccount' });

export default Transactions;