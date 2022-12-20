import { transfer, getHistory, getSendHistory, getRecieveHistory, getAllHistory } from '../controllers/transactions';
import { Router } from 'express';

const router = Router();

import { validateToken } from '../JWT';

router
  .get('/all', getAllHistory)
  .put('/transfer', validateToken, transfer)
  .post('/history', validateToken, getHistory)
  .post('/sendhistory', validateToken, getSendHistory)
  .post('/recievehistory', validateToken, getRecieveHistory)

module.exports = router;