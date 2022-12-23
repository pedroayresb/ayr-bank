
import { login, register, getUsers, getProfile, getUser } from '../controllers/users.controllers';
import { Router } from 'express';

import validateToken from '../middlewares/validateToken';
import { validateUsername, validateRegister, validatePassword } from '../middlewares/users.middlewares';

const router = Router();

router
  .post('/register', validateUsername, validateRegister, validatePassword, register)
  .post('/login', validateUsername, validatePassword, login)
  .get('/', validateToken, getUsers)
  .get('/profile', validateToken, getProfile)
  .get('/:id', validateToken, getUser);


export default router;