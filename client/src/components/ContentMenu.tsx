import { useLocation } from 'react-router-dom';
import {
  Bars3,
  PencilSquare,
} from '../icons';
import { NavItemTitle } from '../types';
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
    <div className='app-drawer-content flex flex-col hover:cursor-auto content-menu'>
      {/* Page content here */}
      <div className='flex justify-between items-center'>
        <label
          htmlFor='app-drawer'
          className='btn btn-ghost drawer-button border-none hover:bg-base-300'
        >
          <Bars3 />
        </label>
        <span className='h-fit'>{selectedItem}</span>
        <span className='px-4 py-2 h-fit flex items-center hover:bg-base-300 hover:cursor-pointer'>
          <PencilSquare />
        </span>
      </div>
      <div className='flex flex-col flex-auto justify-center items-center gap-2 h-full'>
        {children}
      </div>
    </div>
  );
};

export default ContentMenu;
