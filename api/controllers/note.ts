import { Request, Response, NextFunction } from 'express';

import {
  NoteDoc,
  NoteReqBody,
  NoteTitleDoc,
  UpdateNoteReqBody,
} from '../../shared-types';
import noteService from '../services/note';
import mongoose from 'mongoose';

const getNoteBy = async (
  req: Request<{ id: NoteDoc['id'] }>,
  res: Response<NoteDoc>,
  next: NextFunction
) => {
  try {
    const note = await noteService.getNoteBy(req.params.id);
    res.json(note);
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

const updateNote = async (
  req: Request<{ id: mongoose.Types.ObjectId }, NoteDoc, UpdateNoteReqBody>,
  res: Response<NoteDoc>,
  next: NextFunction
) => {
  try {
    const updatedNote = await noteService.updateNote(req.params.id, req.body);
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

const getManyTitles = async (
  req: Request,
  res: Response<NoteTitleDoc[]>,
  next: NextFunction
) => {
  try {
    const titles = await noteService.getManyTitles();
    res.json(titles);
  } catch (error) {
    next(error);
  }
};

export default {
  getNoteBy,
  createNote,
  updateNote,
  getManyTitles,
};
