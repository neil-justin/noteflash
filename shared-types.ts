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

interface NoteDoc extends Document, Omit<NoteReqBody, 'content'> {
  userId: mongoose.Types.ObjectId;
  content?: Object | null;
  trashedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type { UserCredential, NoteDoc, NoteReqBody };
