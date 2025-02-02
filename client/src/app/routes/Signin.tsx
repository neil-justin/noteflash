import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userCredentialSchema } from '../../utils/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInUser } from '../../services/user';
import { NavLink } from 'react-router-dom';
import AlertDisplay from '../../components/AlertDisplay';
import { UserCredentialFormInputs } from '../../types';
import TextField from '../../components/UserCredentialForm/TextField';
import SubmitButton from '../../components/UserCredentialForm/SubmitButton';
import UserCredentialForm from '../../components/UserCredentialForm/UserCredentialForm';

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
      <AlertDisplay
        textClassName='text-lg'
        text='Signing-in user...'
      />
    );
  } else if (mutation.isError) {
    return (
      <AlertDisplay
        textClassName='text-lg text-red-800'
        text='We encountered problem signing-in user...'
      />
    );
  } else if (mutation.isSuccess) {
    return (
      <AlertDisplay
        textClassName='text-lg text-green-800'
        text='User signed in successfully!'
      />
    );
  } else {
    return (
      <div className='flex flex-col justify-center items-center h-screen gap-4'>
        <h1 className='text-3xl font-bold'>Sign In</h1>
        <UserCredentialForm
          onSubmit={handleSubmit(onFormSubmit)}
          className='flex flex-col gap-8'
        >
          {' '}
          <TextField
            fieldName='email'
            register={register}
            errors={errors}
          />
          <TextField
            fieldName='password'
            register={register}
            errors={errors}
          />
          <SubmitButton text='Sign in' />
        </UserCredentialForm>
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
