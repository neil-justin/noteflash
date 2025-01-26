import express from 'express';
import { parseNewUser } from '../util/parser';
import userController from '../controllers/user';

const router = express.Router();

router.post('/register', parseNewUser, userController.registerUser);

export default router;
