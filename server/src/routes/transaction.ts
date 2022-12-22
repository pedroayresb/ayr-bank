

import { transfer, 
  getHistory, 
  getSendHistory, 
  getRecieveHistory } from '../controllers/transaction.controllers';
import { Router } from 'express';

const router = Router();

import validateToken from '../middlewares/validateToken';

router
  .put('/transfer', validateToken, transfer)
  .get('/history', validateToken, getHistory)
  .get('/sendhistory', validateToken, getSendHistory)
  .get('/recievehistory', validateToken, getRecieveHistory)

export default router;