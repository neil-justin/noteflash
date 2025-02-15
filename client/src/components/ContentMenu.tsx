import { useLocation } from 'react-router-dom';
import * as Icons from '../icons';
import { ReactElement } from 'react';
import { capitalCase } from 'change-case';

interface ContentMenuProps {
  children: ReactElement;
}

const ContentMenu = ({ children }: ContentMenuProps) => {
  const activeMenuItem = capitalCase(useLocation().pathname.split('/')[1]);

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
      {children}
    </div>
  );
};

export default ContentMenu;
