import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

type InputFieldProps<T> = {
  name: keyof T;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = <T,>({ name, ...rest }: InputFieldProps<T>) => {
  const { values, handleChange } = useFormContext<T>();
  return (
    <input
      name={name as string}
      value={(values[name] as string | undefined) || ''}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default InputField;