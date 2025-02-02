import { FormEventHandler, ReactNode } from 'react';

interface UserCredentialFormProps {
  children: ReactNode;
  className: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const UserCredentialForm = ({
  children,
  className,
  onSubmit,
}: UserCredentialFormProps) => {
  return (
    <form
      className={className}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default UserCredentialForm;
