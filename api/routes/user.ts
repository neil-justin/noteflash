import express from 'express';
import { parseUserCredential } from '../util/parser';
import userController from '../controllers/user';

const router = express.Router();

router.post('/register', parseUserCredential, userController.registerUser);
router.post('/signin', parseUserCredential, userController.signInUser);

export default router;
