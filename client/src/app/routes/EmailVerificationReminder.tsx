import { useQueryClient } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import { NavLink } from 'react-router-dom';

const EmailVerificationReminder = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user']);

  if (user) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center h-fit shadow-lg w-fit p-12 gap-4'>
          <h1 className='text-lg font-bold'>Verify your email to proceed</h1>
          <p className='text-center'>
            We just sent an email to the address: <i>{user?.email}</i>
            <br />
            Please check your email and click on the link provided to verify
            your email
          </p>
          <p>
            Already verified your account?{' '}
            <NavLink
              to='/signin'
              className='text-blue-600'
            >
              Sign in
            </NavLink>{' '}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <p className='w-fit p-12 text-lg shadow-lg'>
        This page is not available for visit
      </p>
    </div>
  );
};

export { EmailVerificationReminder };
