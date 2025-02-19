import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as Icons from '../icons';
import { capitalCase } from 'change-case';
import classNames from 'classnames';
import { NoteTitleDoc } from '../../../shared-types';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import noteService from '../services/note';
import { NoteDoc } from '../../../shared-types';
import mongoose from 'mongoose';

interface ContentMenuProps {
  notes: NoteTitleDoc[] | undefined;
  updateNoteId: React.Dispatch<React.SetStateAction<string | undefined>>;
  refetchTitles: () => Promise<QueryObserverResult<NoteTitleDoc[], Error>>;
}

const ContentMenu = ({
  notes,
  updateNoteId,
  refetchTitles,
}: ContentMenuProps) => {
  console.log('notes', notes);
  const activeMenuItem = capitalCase(useLocation().pathname.split('/')[1]);
  const activeNoteId = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();
  const createNoteMutation = useMutation({
    mutationFn: noteService.createNote,
    onSuccess(data: NoteDoc) {
      // this will trigger refetch for 'activeNote' queryKey and displays
      // content in the editor
      updateNoteId(data.id.toString());
      // this will refetch titles to display updated list
      refetchTitles();
      navigate(`/all-notes/${data.id}`);
    },
  });
  const updateNoteMutation = useMutation({
    mutationFn: noteService.updateNote,
    onSuccess: () => refetchTitles(),
  });

  const handleNoteClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    noteId: string
  ) => {
    if (noteId === activeNoteId) {
      return event.preventDefault();
    }

    updateNoteId(noteId);
  };

  const handleCreateNoteClick = () => {
    createNoteMutation.mutate();
  };

  const handleUnpinNoteClick = () => {
    updateNoteMutation.mutate({
      id: new mongoose.Types.ObjectId(`${activeNoteId}`),
      pinned: false,
    });
  };

  return (
    <div className='app-drawer-content flex flex-col hover:cursor-auto content-menu sticky top-0'>
      {/* Page content here */}
      <div className='flex justify-between items-center'>
        <div
          className='tooltip tooltip-right'
          data-tip='Main Menu'
        >
          <label
            htmlFor='app-drawer'
            className='btn btn-ghost drawer-button border-none hover:bg-base-300'
          >
            <Icons.Menu size={24} />
          </label>
        </div>
        <span className='h-fit'>{activeMenuItem}</span>
        <div
          className='tooltip tooltip-bottom'
          data-tip='New Note'
        >
          <button
            onClick={handleCreateNoteClick}
            className='btn btn-ghost hover:bg-base-300 hover:cursor-pointer'
          >
            <Icons.NewNote size={24} />
          </button>
        </div>
      </div>
      {notes ? (
        <ul>
          {notes
            // descendingly sort
            .sort(
              (noteA, noteB) =>
                new Date(noteB.updatedAt).getTime() -
                new Date(noteA.updatedAt).getTime()
            )
            .sort((noteA, noteB) => Number(noteB.pinned) - Number(noteA.pinned))
            .map((note) => (
              <li key={note.id.toString()}>
                <NavLink
                  onClick={(e) => handleNoteClick(e, note.id.toString())}
                  className={({ isActive }) =>
                    classNames('flex p-5 visible gap-2', {
                      'bg-base-200': isActive,
                    })
                  }
                  to={`/all-notes/${note.id}`}
                >
                  {/* render DaisyUI tooltip classes only if Note is pinned */}
                  <div
                    {...(note.pinned
                      ? { className: 'tooltip tooltip-bottom' }
                      : {})}
                    {...(note.pinned ? { 'data-tip': 'Unpin' } : {})}
                  >
                    {/* 18px and 40px are the width and height of Pin icon, respectively*/}
                    <button
                      className={classNames('visible w-[18px] h-[40px]', {
                        'hover:cursor-pointer': note.pinned,
                      })}
                      onClick={handleUnpinNoteClick}
                    >
                      {note.pinned && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          width='18'
                          height='18'
                          fill='currentColor'
                        >
                          <path d='M13.8273 1.69L22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69ZM14.5344 5.22554L9.86358 9.89637L7.0417 10.4607L13.5418 16.9609L14.1062 14.139L18.7771 9.46818L14.5344 5.22554Z'></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className='flex flex-col flex-auto'>
                    {note.title}
                    <span className='text-xs w-fit self-end'>
                      {new Date(note.updatedAt).toDateString()}
                    </span>
                  </div>
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
      )}
    </div>
  );
};

export default ContentMenu;
