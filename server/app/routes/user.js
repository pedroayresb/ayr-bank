const controller = require('../controllers/user');
const router = require('express').Router();

router
  .post('/login', controller.login)
  .post('/register', controller.register)
  .get('/', controller.getUsers)


module.exports = router;