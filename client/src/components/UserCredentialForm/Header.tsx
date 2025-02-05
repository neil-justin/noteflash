import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <h1 className='text-2xl font-bold max-w-xs w-full text-center'>
      {children}
    </h1>
  );
};

export default Header;
