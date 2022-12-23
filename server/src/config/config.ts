
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'

dotenv.config();

const numberedPort = Number(process.env.POSTGRES_PORT);

const host = process.env.HOST || 'localhost';
const port = numberedPort || 5432;
const username = process.env.USERNAME || 'postgres';
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