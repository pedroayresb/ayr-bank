import { Sequelize } from 'sequelize';

const database = process.env.DATABASE ? process.env.DATABASE : 'ng-project';
const username = process.env.USERNAME ? process.env.USERNAME : 'postgres';
const password = process.env.PASSWORD ? process.env.PASSWORD : 'postgres_password';
const host = process.env.HOST ? process.env.HOST : 'localhost';

console.log(database, username, password);

const db = new Sequelize(
  database,
  username,
  password,
  {
    host: host,
    dialect: 'postgres',
  }
);

export { db };