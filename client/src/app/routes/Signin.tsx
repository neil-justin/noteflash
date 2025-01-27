import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userCredentialSchema } from '../../utils/schema';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInUser } from '../../services/user';
import { NavLink } from 'react-router-dom';

interface UserCredentialFormInputs {
  email: string;
  password: string;
}

const Signin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserCredentialFormInputs>({
    resolver: yupResolver(userCredentialSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: signInUser });

  const onFormSubmit: SubmitHandler<UserCredentialFormInputs> = (
    data,
    event
  ) => {
    event?.preventDefault();
    mutation.mutate(data, {
      onSuccess: async (data) => {
        queryClient.setQueryData(['user'], data);
      },
    });
  };
  if (mutation.isPending) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p
          role='alert'
          className='text-lg'
        >
          Signing-in user...
        </p>
      </div>
    );
  } else if (mutation.isError) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p
          role='alert'
          className='text-lg text-red-800'
        >
          We encountered problem signing-in user...
        </p>
      </div>
    );
  } else if (mutation.isSuccess) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p
          role='alert'
          className='text-lg text-green-800'
        >
          User signed in successfully!
        </p>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col justify-center items-center h-screen gap-4'>
        <h1 className='text-3xl font-bold'>Sign In</h1>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='flex flex-col gap-5'
        >
          <label
            htmlFor='email'
            className='text-base flex flex-col gap-1'
          >
            Email
            <input
              {...register('email')}
              type='email'
              name='email'
              id='email'
              placeholder='Enter your email'
              className='text-lg outline-1 outline-gray-400 rounded-sm w-80 p-1.5 border-2 border-transparent focus:border-blue-300'
            />
            <ErrorMessage
              errors={errors}
              name='email'
              render={() => (
                <p
                  role='alert'
                  className='text-red-800 text-base'
                >
                  {errors.email?.message}
                </p>
              )}
            />
          </label>
          <label
            htmlFor='password'
            className='text-base flex flex-col gap-1'
          >
            Password
            <input
              {...register('password')}
              type='password'
              name='password'
              id='password'
              placeholder='Enter your password'
              className='text-lg outline-1 outline-gray-400 rounded-sm w-80 p-1.5 border-2 border-transparent focus:border-blue-300'
            />
            <ErrorMessage
              errors={errors}
              name='password'
              render={() => (
                <p
                  role='alert'
                  className='text-red-800 text-base'
                >
                  {errors.password?.message}
                </p>
              )}
            />
          </label>
          <button
            type='submit'
            className='w-80 text-lg self-center p-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 hover:cursor-pointer'
          >
            Sign-in
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <NavLink
            to='/register'
            className='text-blue-600'
          >
            Register
          </NavLink>{' '}
        </p>
      </div>
    );
  }
};

export default Signin;
