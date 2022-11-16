const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  "ng-project",
  "postgres",
  "postgres_password",
  {
    host: process.env.HOST,
    dialect: 'postgres',
  }
);

module.exports = sequelize;