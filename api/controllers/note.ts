import { Request, Response, NextFunction } from 'express';

import { NoteDoc, NoteReqBody } from '../../shared-types';
import noteService from '../services/note';

const getUserNotes = async (
  req: Request,
  res: Response<NoteDoc[]>,
  next: NextFunction
) => {
  try {
    const userNotes = await noteService.getUserNotes();
    res.json(userNotes);
  } catch (error) {
    next(error);
  }
};

const createNote = async (
  req: Request<unknown, NoteDoc, NoteReqBody>,
  res: Response<NoteDoc>,
  next: NextFunction
) => {
  try {
    const createdNote = await noteService.createNote(req.body);
    res.json(createdNote);
  } catch (error) {
    next(error);
  }
};

export default { getUserNotes, createNote };
