import { Request, Response } from 'express';
import { registerUser, loginUser, getAllUsers, getProfileByName, getUserById } from '../services/users.services';

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getProfile = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  try {
    const userByName = await getProfileByName(user.name);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numberId = Number(id);
  try {
    const user = await getUserById(numberId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login, getUsers, getProfile, getUser };