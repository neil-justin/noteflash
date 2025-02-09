import classNames from 'classnames';
import kebabCase from 'just-kebab-case';
import { NavLink } from 'react-router-dom';
import { NavItemTitle } from '../../types';

interface NavItemProps {
  title: NavItemTitle;
  icon: JSX.Element;
}

const NavItem = ({ title, icon }: NavItemProps) => {
  switch (title) {
    case 'Sign out':
      return (
        <li className='mt-auto mb-4'>
          <a className='gap-5 font-medium px-6 py-3 text-error rounded-none'>
            {icon}
            <span className='text-base'>{title}</span>
          </a>
        </li>
      );
    default:
      return (
        <li>
          <NavLink
            to={`/${kebabCase(title)}`}
            className={({ isActive }) =>
              classNames('gap-5 font-medium px-6 py-3 rounded-none', {
                'bg-primary': isActive,
              })
            }
          >
            {icon}
            <span className='text-base'>{title}</span>
          </NavLink>
        </li>
      );
  }
};

export default NavItem;
