import { getAuth } from 'firebase/auth';
import { generateJSON } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import {
  NoteDoc,
  NoteReqBody,
  NoteTitleDoc,
  UpdateNoteReqBody,
} from '../../shared-types';
import Note from '../models/note';
import { FirebaseError } from 'firebase/app';
import User from '../models/user';
import { UserDoc } from '../types';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import mongoose from 'mongoose';

const getNoteBy = async (id: NoteDoc['id']): Promise<NoteDoc> => {
  const currentUser = getAuth().currentUser;

  if (!currentUser) {
    throw new FirebaseError('auth/user-not-found', 'User not found');
  }

  return (await Note.findById(id)) as NoteDoc;
};

const createNote = async (note: NoteReqBody): Promise<NoteDoc> => {
  const currentUser = getAuth().currentUser;

  if (!currentUser) {
    throw new FirebaseError('auth/user-not-found', 'User not found');
  }

  const user = (await User.findOne({
    email: currentUser.email,
  })) as UserDoc;
  const noteFields = {
    ...note,
    userId: user.id,
    // if note.content (HTML) exists, generate JSON from it
    ...(note.content && {
      content: generateJSON(note.content, [Document, Paragraph, Text]),
    }),
  };

  return await new Note(noteFields).save();
};

const updateNote = async (
  id: mongoose.Types.ObjectId,
  note: UpdateNoteReqBody
): Promise<NoteDoc> => {
  const currentUser = getAuth().currentUser;

  if (!currentUser) {
    throw new FirebaseError('auth/user-not-found', 'User not found');
  }

  console.log('note', note);

  return (await Note.findByIdAndUpdate(
    id,
    {
      // if note.title exists, update title field
      // same goes for the next in line
      ...(note.title && { title: note.title }),
      ...(note.content && {
        content: generateJSON(note.content, [StarterKit, Link, Underline]),
      }),
      ...(note.pinned !== undefined && { pinned: note.pinned }),
      ...(note.archived !== undefined && { archived: note.archived }),
      ...(note.trashedAt !== undefined && { trashedAt: note.trashedAt }),
    },
    { new: true }
  )) as NoteDoc;
};

const getManyTitles = async (): Promise<NoteTitleDoc[]> => {
  const currentUser = getAuth().currentUser;

  if (!currentUser) {
    throw new FirebaseError('auth/user-not-found', 'User not found');
  }

  const user = (await User.findOne({
    email: currentUser.email,
  })) as UserDoc;
  return await Note.find(
    { userId: user.id },
    { userId: 1, title: 1, updatedAt: 1, pinned: 1, archived: 1, trashedAt: 1 }
  );
};

export default {
  getNoteBy,
  createNote,
  updateNote,
  getManyTitles,
};
