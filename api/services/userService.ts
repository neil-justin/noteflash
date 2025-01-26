// import User from '../models/user';
import { MongooseError } from 'mongoose';
import { UserCredential } from '../types';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
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

export default { registerUser };
