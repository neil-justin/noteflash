import {
  ArchiveBoxArrowDown,
  LightBulb,
  ArrowRightStartOnRectangle,
  Trash,
} from '../../icons';
import NavItem from './NavItem';

const items = [
  {
    title: 'All Notes' as const,
    icon: <LightBulb size={6} />,
  },
  {
    title: 'Archive' as const,
    icon: <ArchiveBoxArrowDown size={6} />,
  },
  {
    title: 'Trash' as const,
    icon: <Trash size={6} />,
  },
  {
    title: 'Sign out' as const,
    icon: <ArrowRightStartOnRectangle size={6} />,
  },
];

const AppSidebar = () => {
  return (
    <div className='drawer z-10 w-full'>
      <input
        id='app-drawer'
        type='checkbox'
        className='drawer-toggle'
      />
      <div className='drawer-side'>
        <label
          htmlFor='app-drawer'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-base-200 text-base-content min-h-full w-70 gap-1 p-0 pt-8'>
          {/* Sidebar content here */}
          {items.map((item) => (
            <NavItem
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          {}
        </ul>
      </div>
    </div>
  );
};

export default AppSidebar;
