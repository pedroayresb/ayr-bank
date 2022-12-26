import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/config';
import Transactions from './transaction.models';
import User from './users.models';

interface AccountAttributes {
  id: number;
  balance: number;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}
interface AccountInstance extends Model<AccountAttributes, AccountCreationAttributes>, AccountAttributes {}

const Account = sequelize.define<AccountInstance>('Account', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


export default Account;