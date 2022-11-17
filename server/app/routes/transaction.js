const controller = require('../controllers/transactions');
const router = require('express').Router();

const { validateToken } = require('../JWT');

router
  .put('/transfer', validateToken, controller.transfer)
  .post('/history', validateToken, controller.getHistory)
  .post('/sendhistory', validateToken, controller.getSendHistory)
  .post('/recievehistory', validateToken, controller.getRecieveHistory);

module.exports = router;