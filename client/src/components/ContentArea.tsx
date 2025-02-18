import { QueryObserverResult } from '@tanstack/react-query';
import { NoteDoc, NoteTitleDoc } from '../../../shared-types';
import Tiptap from '../app/Tiptap';

interface ContentAreaProps {
  refetchTitles: () => Promise<QueryObserverResult<NoteTitleDoc[], Error>>;
  activeNote: NoteDoc | undefined;
}

const ContentArea = ({
  refetchTitles,
  activeNote,
}: ContentAreaProps) => {
  if (!activeNote) {
    return <div className='content-area shadow-lg'></div>;
  }

  return (
    <div className='content-area overflow-hidden shadow-lg'>
      <Tiptap
        refetchTitles={refetchTitles}
        activeNote={activeNote}
      />
    </div>
  );
};

export default ContentArea;
