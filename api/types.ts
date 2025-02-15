import { Document } from 'mongoose';

interface UserDoc extends Document {
  firebaseAuthUid: string;
  email: string;
}

export type { UserDoc };
