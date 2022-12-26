import express from 'express';
import userRouter from './routes/users';
import transactionRouter from './routes/transaction';

import cors from 'cors';

import dbInit from './models/init';

dbInit();

const app = express();
const client = 'client' || 'localhost'

app.use(express.json());

app.use(cors());

app.use('/user', userRouter);
app.use('/transaction', transactionRouter);


export default app; 
