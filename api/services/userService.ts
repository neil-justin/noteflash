// import User from '../models/user';
import { MongooseError } from 'mongoose';
import { UserCredential } from '../types';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';

const registerUser = async (host: string, userCredential: UserCredential) => {
  const { email, password } = userCredential;
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    throw new MongooseError(
      'This account already exists in our database. Please sign in instead.'
    );
  }

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(user);
  return user;
};

export default { registerUser };
