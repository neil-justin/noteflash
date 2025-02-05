import { ReactNode } from 'react';

interface SubmitButtonProps {
  children: ReactNode;
}

const SubmitButton = ({ children }: SubmitButtonProps) => {
  return (
    <>
      <button
        type='submit'
        className='btn btn-primary btn-lg'
      >
        {children}
      </button>
    </>
  );
};

export default SubmitButton;
