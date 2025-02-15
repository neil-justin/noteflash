import express from 'express';
import noteController from '../controllers/note';

const router = express.Router();

router.post('/', noteController.createNote);

export default router;
