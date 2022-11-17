const controller = require('../controllers/user');
const router = require('express').Router();

const { validateToken } = require('../JWT');
const { validateRegister } = require('../middlewares/register');

router
  .post('/login', controller.login)
  .post('/register', validateRegister, controller.register)
  .get('/', controller.getUsers)
  .get('/profile', validateToken, controller.getProfile)
  .get('/:id', controller.getUserById)
  .post('/autologin', controller.loginWithToken);


module.exports = router;