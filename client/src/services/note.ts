import axios from 'axios';
import { NoteDoc } from '../../../shared-types';

const baseUrl = '/api/notes';

const getUserNotes = async (): Promise<NoteDoc[]> => {
  return (await axios.get(baseUrl)).data;
};

export default { getUserNotes };
