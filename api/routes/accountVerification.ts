import express from 'express';
import accountVerificationController from '../controllers/accountVerification';

const router = express.Router();

router.get('/', accountVerificationController.verifyUser);

export default router;
