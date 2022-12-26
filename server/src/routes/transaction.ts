import { transfer, 
  getHistory, 
  getSendHistory, 
  getReceiveHistory } from '../controllers/transaction.controllers';
import { Router } from 'express';

const router = Router();

import validateToken from '../middlewares/validateToken';
import { hasTo, hasAmount } from '../middlewares/transaction.middlewares';

router
  .put('/transfer', validateToken, hasTo, hasAmount, transfer)
  .get('/history', validateToken, getHistory)
  .get('/sendhistory', validateToken, getSendHistory)
  .get('/receivehistory', validateToken, getReceiveHistory);

export default router;