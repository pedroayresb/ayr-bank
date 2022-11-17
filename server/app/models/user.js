const Sequelize = require('sequelize');
const db = require('../util/database');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

const Account = db.define('accounts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  balance: Sequelize.INTEGER,
});

const Transaction = db.define('transaction', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  value: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
});

User.belongsTo(Account, { foreignKey: 'account_id' });

Transaction.belongsTo(Account, { foreignKey: 'debitedAccount' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccount' });

module.exports = {
  User,
  Account,
  Transaction,
};
