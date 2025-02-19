import mongoose from 'mongoose';
import { NoteDoc } from '../../shared-types';

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, default: 'Untitled' },
    content: { type: Object, default: undefined },
    tags: {
      type: [String],
      default: undefined,
    },
    archived: { type: Boolean, default: false },
    trashedAt: { type: Date, default: undefined },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model<NoteDoc>('Note', noteSchema);

export default Note;
