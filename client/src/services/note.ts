import axios from 'axios';
import {
  NoteDoc,
  NoteTitleDoc,
  UpdateNoteReqBody,
} from '../../../shared-types';
import mongoose from 'mongoose';

const baseUrl = '/api/notes';

const getManyTitles = async (): Promise<NoteTitleDoc[]> => {
  return (await axios.get(`${baseUrl}/titles`)).data;
};

const updateNote = async (
  note: UpdateNoteReqBody & { id: mongoose.Types.ObjectId }
): Promise<NoteDoc> => {
  const { id, ...noteReqBody } = note;

  return (await axios.put(`${baseUrl}/${id}`, noteReqBody)).data;
};

const getNoteBy = async (id: string | undefined | null): Promise<NoteDoc> => {
  return (await axios.get(`${baseUrl}/${id}`)).data;
};

const createNote = async () => {
  return (await axios.post(`${baseUrl}/`)).data;
};

export default { getManyTitles, updateNote, getNoteBy, createNote };
