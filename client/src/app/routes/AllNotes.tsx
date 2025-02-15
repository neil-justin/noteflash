import { useQuery } from '@tanstack/react-query';
import AppSidebar from '../../components/AppSidebar/index';
import ContentArea from '../../components/ContentArea';
import ContentMenu from '../../components/ContentMenu';
import * as Icons from '../../icons';
import Tiptap from '../Tiptap';
import noteService from '../../services/note';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NoteDoc } from '../../../../shared-types';

const AllNotes = () => {
  const { data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: noteService.getUserNotes,
  });
  const [activeNote, setActiveNote] = useState<NoteDoc | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const contentMenuChild = notes ? (
    <ul>
      {notes.map((note) => (
        <li key={note.id.toString()}>
          <NavLink
            onClick={() => setActiveNote(note)}
            className={({ isActive }) =>
              classNames('block p-5', { 'bg-base-200': isActive })
            }
            to={`/all-notes/${note.id}`}
          >
            {note.title}
          </NavLink>
        </li>
      ))}
    </ul>
  ) : (
    <div className='flex flex-col flex-auto justify-center items-center gap-2 h-full'>
      <Icons.LightBulb size={32} />
      <span className='text-sm text-primary hover:cursor-pointer'>
        Create your first note
      </span>
    </div>
  );

  useEffect(() => {
    // if there are user notes and user visits /all-notes
    if (notes && location.pathname.startsWith('/all-notes')) {
      navigate(`/all-notes/${notes[0].id}`);
      setActiveNote(notes[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  return (
    <>
      <AppSidebar />
      <ContentMenu>{contentMenuChild}</ContentMenu>
      <ContentArea>
        <Tiptap activeNote={activeNote} />
      </ContentArea>
    </>
  );
};

export default AllNotes;
