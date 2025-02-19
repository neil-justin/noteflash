import AppSidebar from '../../components/AppSidebar';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import { useQuery } from '@tanstack/react-query';
import noteService from '../../services/note';
import { useState } from 'react';

const AllNotes = () => {
  const [noteId, setNoteId] = useState<string | undefined | null>();
  const { data: notes, refetch } = useQuery({
    queryKey: ['titles'],
    queryFn: noteService.getManyTitles,
  });
  const { data: activeNote } = useQuery({
    queryKey: ['activeNote', noteId, notes],
    queryFn: () => {
      if (!noteId) return;

      return noteService.getNoteBy(noteId);
    },
    enabled: !!noteId,
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
        updateNoteId={setNoteId}
      />
    </>
  );
};

export default AllNotes;
