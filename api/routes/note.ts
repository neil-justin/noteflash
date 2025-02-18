import express from 'express';
import noteController from '../controllers/note';

const router = express.Router();

router.get('/titles', noteController.getManyTitles)
router.get('/:id', noteController.getNoteBy)
router.get('/', noteController.getUserNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);

export default router;
