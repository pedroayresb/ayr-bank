
import { login, register, getUsers, getProfile, getUser } from '../controllers/users.controllers';
import { Router } from 'express';

import validateToken from '../middlewares/validateToken';

const router = Router();

router
  .post('/register', register)
  .post('/login', login)
  .get('/', validateToken, getUsers)
  .get('/profile', validateToken, getProfile)
  .get('/:id', validateToken, getUser);


export default router;