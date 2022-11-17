const controller = require('../controllers/transactions');
const router = require('express').Router();

const { validateToken } = require('../JWT');

router
  .put('/transfer', controller.transfer)
  .post('/history', controller.getHistory);

module.exports = router;