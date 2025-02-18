import AppSidebar from '../../components/AppSidebar';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import { useQuery } from '@tanstack/react-query';
import noteService from '../../services/note';
import { useState } from 'react';

const AllNotes = () => {
  const [noteId, setNoteId] = useState<string | undefined>();
  const { data: activeNote } = useQuery({
    queryKey: ['activeNote', noteId],
    queryFn: () => {
      return noteService.getNoteBy(noteId);
    },
    enabled: !!noteId,
  });
  const { data: notes, refetch } = useQuery({
    queryKey: ['titles'],
    queryFn: noteService.getManyTitles,
  });

  return (
    <>
      <AppSidebar />
      <ContentMenu
        notes={notes}
        updateNoteId={setNoteId}
        refetchTitles={refetch}
      />
      <ContentArea
        refetchTitles={refetch}
        activeNote={activeNote}
      />
    </>
  );
};

export default AllNotes;
