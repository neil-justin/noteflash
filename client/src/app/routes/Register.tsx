import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userCredentialSchema } from '../../utils/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../../services/user';
import { NavLink, useNavigate } from 'react-router-dom';
import AlertDisplay from '../../components/AlertDisplay';
import { UserCredentialFormInputs } from '../../types';
import TextField from '../../components/UserCredentialForm/TextField';
import SubmitButton from '../../components/UserCredentialForm/SubmitButton';
import UserCredentialForm from '../../components/UserCredentialForm/UserCredentialForm';

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserCredentialFormInputs>({
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
      <AlertDisplay
        textClassName='text-lg'
        text='Registering user...'
      />
    );
  } else if (mutation.isError) {
    return (
      <AlertDisplay
        textClassName='text-lg text-red-800'
        text='We encountered problem registering user...'
      />
    );
  } else if (mutation.isSuccess) {
    return (
      <AlertDisplay
        textClassName='text-lg text-green-800'
        text='User registered successfully!'
      />
    );
  } else {
    return (
      <div className='flex flex-col justify-center items-center h-screen gap-4'>
        <h1 className='text-3xl font-bold'>Register</h1>
        <UserCredentialForm
          onSubmit={handleSubmit(onFormSubmit)}
          className='flex flex-col gap-8'
        >
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
          <SubmitButton text='Register' />
        </UserCredentialForm>
        <p>
          Already have an account?{' '}
          <NavLink
            to='/signin'
            className='text-blue-600'
          >
            Sign in
          </NavLink>{' '}
        </p>
      </div>
    );
  }
};

export default Register;
