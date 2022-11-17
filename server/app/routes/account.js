const controller = require('../controllers/account');
const router = require('express').Router();

const { validateToken } = require('../JWT');

router
  .get('/', controller.getAccounts)

module.exports = router;