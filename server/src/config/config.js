import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize'

dotenv.config();

const host = process.env.HOST || 'localhost';
const port = 3002;
const username = 'postgres';
const password = process.env.PASSWORD || 'postgres_password';
const database = process.env.DATABASE || 'postgres';

console.log(`Connecting to database ${database} on ${host}:${port} with user ${username} and password ${password}`)

const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host,
    port,
    dialect: 'postgres' ,
  }
);

export default sequelize;