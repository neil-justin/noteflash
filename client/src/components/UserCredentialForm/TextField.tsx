import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UserCredentialFormInputs } from '../../types';

interface TextFieldProps {
  fieldName: 'email' | 'password';
  register: UseFormRegister<UserCredentialFormInputs>;
  errors: FieldErrors<UserCredentialFormInputs>;
}

const TextField = ({ fieldName, register, errors }: TextFieldProps) => {
  return (
    <label
      htmlFor={fieldName}
      className='text-base flex flex-col gap-1'
    >
      {/* Capitalize the first letter */}
      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
      <input
        {...register(fieldName)}
        type={fieldName}
        name={fieldName}
        id={fieldName}
        placeholder={`Enter your ${fieldName}`}
        className='text-lg outline-1 outline-gray-400 rounded-sm w-80 p-1.5 border-2 border-transparent focus:border-blue-300'
      />
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={() => (
          <p
            role='alert'
            className='text-red-800 text-base'
          >
            {errors[fieldName]?.message}
          </p>
        )}
      />
    </label>
  );
};

export default TextField;
