// import User from '../models/user';
import { MongooseError } from 'mongoose';
import User from '../models/user';
import { UserCredentials } from '../types';
import { sendEmailVerification } from '../util/helper';
import bcrypt from 'bcrypt';

const registerUser = async (host: string, userCredentials: UserCredentials) => {
  const { email, password } = userCredentials;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new MongooseError(
      'This account already exists in our database. Please sign in instead.'
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await sendEmailVerification(email, host);
  const newUser = new User({ email, hashedPassword });
  return await newUser.save();
};

export default { registerUser };
