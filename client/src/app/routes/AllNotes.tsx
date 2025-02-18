// import { useQuery } from '@tanstack/react-query';
// import AppSidebar from '../../components/AppSidebar/index';
// import ContentArea from '../../components/ContentArea';
// import ContentMenu from '../../components/ContentMenu';
// import * as Icons from '../../icons';
// import Tiptap from '../Tiptap';
// import noteService from '../../services/note';
// import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import classNames from 'classnames';
// import { useEffect, useState } from 'react';
// import { ActiveNote } from '../../types';
// import { NoteDoc } from '../../../../shared-types';

import AppSidebar from '../../components/AppSidebar';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import { useQuery } from '@tanstack/react-query';
import noteService from '../../services/note';
import { useState } from 'react';
// const AllNotes = () => {
//   const { data: notes } = useQuery({
//     queryKey: ['notes'],
//     queryFn: noteService.getUserNotes,
//   });
//   const [activeNote, setActiveNote] = useState<ActiveNote | null>(null);
//   const params = useParams();
//   const navigate = useNavigate();

//   const contentMenuChild = notes ? (
//     <ul>
//       {notes.map((note) => (
//         <li key={note.id.toString()}>
//           <NavLink
//             onClick={() =>
//               setActiveNote({
//                 id: note.id,
//                 title: note.title,
//                 // conditionally add "content" prop if it exists
//                 ...(note.content && { content: note.content }),
//               })
//             }
//             className={({ isActive }) =>
//               classNames('block p-5', { 'bg-base-200': isActive })
//             }
//             to={`/all-notes/${note.id}`}
//           >
//             {note.title}
//           </NavLink>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <div className='flex flex-col flex-auto justify-center items-center gap-2 h-full'>
//       <Icons.LightBulb size={32} />
//       <span className='text-sm text-primary hover:cursor-pointer'>
//         Create your first note
//       </span>
//     </div>
//   );

//   const contentAreaChild = notes ? (
//     <Tiptap activeNote={activeNote} />
//   ) : (
//     <div className='h-screen w-screen'></div>
//   );

//   useEffect(() => {
//     if (notes) {
//       const defaultNote = params.id
//         ? (notes.find((note) => note.id.toString() === params.id) as NoteDoc)
//         : notes[0];

//       navigate(`/all-notes/${defaultNote.id}`);
//       setActiveNote({
//         id: defaultNote.id,
//         title: defaultNote.title,
//         // conditionally add "content" prop if it exists
//         ...(defaultNote.content && { content: defaultNote.content }),
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [notes]);

//   return (
//     <>
//       <AppSidebar />
//       <ContentMenu>{contentMenuChild}</ContentMenu>
//       <ContentArea>{contentAreaChild}</ContentArea>
//     </>
//   );
// };

// export default AllNotes;

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
      />
      <ContentArea
        refetchTitles={refetch}
        activeNote={activeNote}
      />
    </>
  );
};

export default AllNotes;
