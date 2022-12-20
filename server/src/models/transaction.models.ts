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
  },
  creditedAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

Transactions.belongsTo(Account, { foreignKey: 'debitedAccount' });
Transactions.belongsTo(Account, { foreignKey: 'creditedAccount' });

export default Transactions;