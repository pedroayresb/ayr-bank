import { login, register, getUsers, getProfile, getUserById, loginWithToken } from '../controllers/user';
import { Router } from 'express';

const router = Router();

import { validateToken } from '../JWT';
import { validateRegister } from '../middlewares/register';

router
  .post('/login', login)
  .post('/register', validateRegister, register)
  .get('/', getUsers)
  .get('/profile', validateToken, getProfile)
  .get('/:id', getUserById)
  .post('/autologin', loginWithToken);


module.exports = router;