import { Request, Response, NextFunction } from 'express';

import { NoteDoc, NoteReqBody } from '../../shared-types';
import noteService from '../services/note';

const createNote = async (
  req: Request<unknown, NoteDoc, NoteReqBody>,
  res: Response<NoteDoc>,
  next: NextFunction
) => {
  console.log('createNote ran');

  try {
    const createdNote = await noteService.createNote(req.body);
    console.log('createdNote', createdNote);
    res.json(createdNote);
  } catch (error) {
    console.log('errorrrrrrr', error);
    next(error);
  }
};

export default { createNote };
