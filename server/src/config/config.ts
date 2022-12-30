import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'

const pathToEnv = __dirname.split('/server')[0];

dotenv.config({ path: pathToEnv+'/.env'});

const numberedPort = Number(process.env.POSTGRES_PORT);


const host = process.env.DB_HOST || 'localhost';
const port = numberedPort || 3002;
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || 'password';
const database = process.env.DB_DATABASE || 'postgres';

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