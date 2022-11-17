const controller = require('../controllers/user');
const router = require('express').Router();

const { validateToken } = require('../JWT');

router
  .post('/login', controller.login)
  .post('/register', controller.register)
  .get('/', controller.getUsers)
  .get('/profile', validateToken, controller.getProfile);


module.exports = router;