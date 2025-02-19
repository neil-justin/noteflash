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

interface UpdateNoteReqBody extends Partial<NoteReqBody> {
  pinned?: boolean;
  trashedAt?: Date;
}

interface NoteDoc extends Document, Omit<NoteReqBody, 'content'> {
  id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content?: Object | null;
  trashedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  pinned: boolean;
}

interface NoteTitleDoc extends Document {
  id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  updatedAt: Date;
  pinned: boolean;
  archived: boolean;
  trashedAt?: Date | null;
}

export type {
  UserCredential,
  NoteDoc,
  NoteReqBody,
  UpdateNoteReqBody,
  NoteTitleDoc,
};
