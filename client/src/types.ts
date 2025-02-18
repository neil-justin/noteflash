import mongoose from "mongoose";

interface UserCredentialFormInputs {
  email: string;
  password: string;
}

type NavItemTitle = 'All Notes' | 'Archive' | 'Trash' | 'Sign out';

interface ActiveNote {
  id: mongoose.Types.ObjectId;
  title: string;
  content?: object | null;
}

export type { UserCredentialFormInputs, NavItemTitle, ActiveNote };
