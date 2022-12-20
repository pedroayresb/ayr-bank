"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.Account = exports.User = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../util/database");
var User = database_1.db.define('users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_name: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
});
exports.User = User;
var Account = database_1.db.define('accounts', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    balance: sequelize_1.DataTypes.INTEGER,
});
exports.Account = Account;
var Transaction = database_1.db.define('transaction', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    value: sequelize_1.DataTypes.INTEGER,
    createdAt: sequelize_1.DataTypes.DATE,
});
exports.Transaction = Transaction;
User.belongsTo(Account, { foreignKey: 'account_id' });
Transaction.belongsTo(Account, { foreignKey: 'debitedAccount' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccount' });
