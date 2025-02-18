import mongoose, { Document } from 'mongoose';

interface UserCredential {
  email: string;
  password: string;
}

interface NoteReqBody {
  title: string;
  content?: string;
  tags?: string[];
  archived: boolean;
}

interface UpdateNoteReqBody extends Partial<NoteReqBody> {}

interface NoteDoc extends Document, Omit<NoteReqBody, 'content'> {
  id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content?: Object | null;
  trashedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteTitleDoc extends Document {
  id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: 'string';
}

export type {
  UserCredential,
  NoteDoc,
  NoteReqBody,
  UpdateNoteReqBody,
  NoteTitleDoc,
};
