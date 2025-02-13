import { useLocation } from 'react-router-dom';
import { NavItemTitle } from '../types';
import * as Icons from '../icons';
import { ReactElement, useEffect, useState } from 'react';
import { pathnameToTitleCase } from '../utils';

interface ContentMenuProps {
  children: ReactElement;
}

const ContentMenu = ({ children }: ContentMenuProps) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<NavItemTitle>(
    pathnameToTitleCase(location.pathname) as NavItemTitle
  );

  useEffect(() => {
    setSelectedItem(pathnameToTitleCase(location.pathname) as NavItemTitle);
  }, [location.pathname]);

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
        <span className='h-fit'>{selectedItem}</span>
        <div
          className='tooltip tooltip-bottom'
          data-tip='New Note'
        >
          <button className='btn btn-ghost hover:bg-base-300 hover:cursor-pointer'>
            <Icons.NewNote size={24} />
          </button>
        </div>
      </div>
      <div className='flex flex-col flex-auto justify-center items-center gap-2 h-full'>
        {children}
      </div>
    </div>
  );
};

export default ContentMenu;
