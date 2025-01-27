import axios from 'axios';
import { User } from 'firebase/auth';
import { UserCredential } from '../../../shared-types';

const baseUrl = '/api/users';

const registerUser = async (userCredential: UserCredential): Promise<User> => {
  return (await axios.post(`${baseUrl}/register`, userCredential)).data;
};

export { registerUser };
