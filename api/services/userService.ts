// import User from '../models/user';
import { MongooseError } from 'mongoose';
import { UserCredential } from '../types';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  validatePassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const registerUser = async (host: string, userCredential: UserCredential) => {
  const { email, password } = userCredential;
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    throw new MongooseError(
      'This account already exists in our database. Please sign in instead.'
    );
  }

  const { isValid } = await validatePassword(auth, password);

  if (isValid) {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(user);
    return user;
  } else {
    throw new FirebaseError('auth/weak-password', 'Weak user password');
  }
};

const signInUser = async (userCredential: UserCredential) => {
  const { email, password } = userCredential;
  const auth = getAuth();

  // is password is incorrect, this throws an error
  return await signInWithEmailAndPassword(auth, email, password);
};

export default { registerUser, signInUser };
