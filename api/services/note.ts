import { getAuth } from 'firebase/auth';
import { generateJSON } from '@tiptap/html';

import { NoteDoc, NoteReqBody } from '../../shared-types';
import Note from '../models/note';
import { FirebaseError } from 'firebase/app';
import User from '../models/user';
import { UserDoc } from '../types';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

const getUserNotes = async (): Promise<NoteDoc[]> => {
  const currentUser = getAuth().currentUser;

  if (!currentUser) {
    throw new FirebaseError('auth/user-not-found', 'User not found');
  }

  const user = (await User.findOne({
    email: currentUser.email,
  })) as UserDoc;
  return await Note.find({ userId: user.id });
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

export default { getUserNotes, createNote };
