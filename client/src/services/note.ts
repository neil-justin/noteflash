import axios from 'axios';
import { NoteDoc, NoteTitleDoc } from '../../../shared-types';
import mongoose from 'mongoose';

const baseUrl = '/api/notes';

const getUserNotes = async (): Promise<NoteDoc[]> => {
  return (await axios.get(baseUrl)).data;
};

const getManyTitles = async (): Promise<NoteTitleDoc[]> => {
  return (await axios.get(`${baseUrl}/titles`)).data;
};

const updateNote = async (note: {
  id: mongoose.Types.ObjectId;
  title?: string;
  content?: string;
}): Promise<NoteDoc> => {
  const { id, ...noteReqBody } = note;

  return (await axios.put(`${baseUrl}/${id}`, noteReqBody)).data;
};

const getNoteBy = async (id: string | undefined): Promise<NoteDoc> => {
  return (await axios.get(`${baseUrl}/${id}`)).data;
};

export default { getUserNotes, getManyTitles, updateNote, getNoteBy };
