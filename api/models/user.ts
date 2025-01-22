import mongoose from 'mongoose';
import pkg from 'validator';

const { isEmail } = pkg;

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
    validate: [
      isEmail,
      'Email validation failed. Please enter a valid email address',
    ],
  },
  hashedPassword: {
    required: true,
    type: String,
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);

export default User;
