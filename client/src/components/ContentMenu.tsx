import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from '../icons';
import { capitalCase } from 'change-case';
import classNames from 'classnames';
import { NoteTitleDoc } from '../../../shared-types';

interface ContentMenuProps {
  notes: NoteTitleDoc[] | undefined;
  updateNoteId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ContentMenu = ({ notes, updateNoteId }: ContentMenuProps) => {
  const activeMenuItem = capitalCase(useLocation().pathname.split('/')[1]);
  const activeNoteId = useLocation().pathname.split('/')[2];

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    noteId: string
  ) => {
    if (noteId === activeNoteId) {
      return event.preventDefault();
    }

    updateNoteId(noteId);
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
          <button className='btn btn-ghost hover:bg-base-300 hover:cursor-pointer'>
            <Icons.NewNote size={24} />
          </button>
        </div>
      </div>
      {notes ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id.toString()}>
              <NavLink
                onClick={(e) => handleClick(e, note.id.toString())}
                className={({ isActive }) =>
                  classNames('block p-5 visible', { 'bg-base-200': isActive })
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
      )}
    </div>
  );
};

export default ContentMenu;
