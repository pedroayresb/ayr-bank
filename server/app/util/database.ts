import { Sequelize } from 'sequelize';

const db = new Sequelize(
  "ng-project",
  "postgres",
  "postgres_password",
  {
    host: process.env.HOST,
    dialect: 'postgres',
  }
);

export { db };