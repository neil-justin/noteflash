import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userCredentialSchema } from '../../utils/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../../services/user';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserCredentialFormInputs } from '../../types';
import TextField from '../../components/UserCredentialForm/TextField';
import SubmitButton from '../../components/UserCredentialForm/SubmitButton';
import UserCredentialForm from '../../components/UserCredentialForm/UserCredentialForm';
import Header from '../../components/UserCredentialForm/Header';

const Register = () => {
  const { handleSubmit, register } = useForm<UserCredentialFormInputs>({
    resolver: yupResolver(userCredentialSchema),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: registerUser });

  const onFormSubmit: SubmitHandler<UserCredentialFormInputs> = (
    data,
    event
  ) => {
    event?.preventDefault();
    mutation.mutate(data, {
      onSuccess: async (data) => {
        queryClient.setQueryData(['user'], data);
        navigate('/email-verification-reminder');
      },
    });
  };
  if (mutation.isPending) {
    return (
      <div
        role='alert'
        className='alert alert-info alert-soft'
      >
        <span className='text-base'>Registering user... Please wait.</span>
      </div>
    );
  } else if (mutation.isError) {
    return (
      <div
        role='alert'
        className='alert alert-error alert-soft'
      >
        <span className='text-base'>
          We encountered problem registering user... Please try again.
        </span>
      </div>
    );
  } else if (mutation.isSuccess) {
    return (
      <div
        role='alert'
        className='alert alert-success alert-soft'
      >
        <span className='text-base'>User registered successfully!</span>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col justify-center items-center h-screen gap-5'>
        <UserCredentialForm
          onSubmit={handleSubmit(onFormSubmit)}
          className='flex flex-col gap-6 max-w-xs w-full'
        >
          <Header>Register to your account</Header>
          <TextField
            title='email'
            register={register}
          />
          <TextField
            title='password'
            register={register}
          />
          <SubmitButton>Register</SubmitButton>
        </UserCredentialForm>
        <p>
          Already have an account?{' '}
          <NavLink
            to='/signin'
            className='text-primary hover:underline'
          >
            Sign in
          </NavLink>{' '}
        </p>
      </div>
    );
  }
};

export default Register;
