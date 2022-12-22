import express from 'express';
import userRouter from './routes/users';
import transactionRouter from './routes/transaction';

import cors from 'cors';

import dbInit from './models/init';

dbInit();

const app = express();

app.use(express.json());

app.use(cors({
  credentials: true, 
  origin: 'http://localhost:3000',
}));

app.use('/user', userRouter);
app.use('/transaction', transactionRouter);


export default app; 
