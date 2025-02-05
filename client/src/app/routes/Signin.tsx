import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userCredentialSchema } from '../../utils/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInUser } from '../../services/user';
import { NavLink } from 'react-router-dom';
import { UserCredentialFormInputs } from '../../types';
import TextField from '../../components/UserCredentialForm/TextField';
import SubmitButton from '../../components/UserCredentialForm/SubmitButton';
import UserCredentialForm from '../../components/UserCredentialForm/UserCredentialForm';
import Header from '../../components/UserCredentialForm/Header';

const Signin = () => {
  const {
    handleSubmit,
    register,
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
      <div
        role='alert'
        className='alert alert-info alert-soft'
      >
        <span className='text-base'>Signing in user... Please wait.</span>
      </div>
    );
  } else if (mutation.isError) {
    return (
      <div
        role='alert'
        className='alert alert-error alert-soft'
      >
        <span className='text-base'>
          We encountered problem signing in user... Please try again.
        </span>
      </div>
    );
  } else if (mutation.isSuccess) {
    return (
      <div
        role='alert'
        className='alert alert-success alert-soft'
      >
        <span className='text-base'>User signed in successfully!</span>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col justify-center items-center h-screen gap-5'>
        <UserCredentialForm
          onSubmit={handleSubmit(onFormSubmit)}
          className='flex flex-col gap-6 max-w-xs w-full'
        >
          <Header>Sign in to your account</Header>
          <TextField
            title='email'
            register={register}
          />
          <TextField
            title='password'
            register={register}
          />
          <SubmitButton>Sign in</SubmitButton>
        </UserCredentialForm>
        <p>
          Don't have an account yet?{' '}
          <NavLink
            to='/register'
            className='text-primary hover:underline'
          >
            Register
          </NavLink>{' '}
        </p>
      </div>
    );
  }
};

export default Signin;
