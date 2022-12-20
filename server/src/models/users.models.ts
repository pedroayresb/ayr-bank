import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/config';
import Account from './accounts.models';

interface UserAttributes {
  id: number;
  name: string;
  password: string;
  accountId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: 'id',
    },
  },
});

User.belongsTo(Account, { foreignKey: 'accountId' });

export default User;