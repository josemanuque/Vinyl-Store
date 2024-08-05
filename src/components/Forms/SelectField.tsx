import React, { ChangeEvent } from 'react';
import { useFormContext } from '../../contexts/FormContext';

type SelectFieldProps<T> = {
  name: keyof T;
  disabledOption: { value: string, label: string};
  options: { value: string | undefined; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = <T,>({ name, disabledOption, options, ...rest }: SelectFieldProps<T>) => {
  const { values, handleChange } = useFormContext<T>();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChange(e as unknown as ChangeEvent<HTMLInputElement>);
  };

  return (
    <select
      name={name as string}
      value={(values[name] as string | undefined) || ''}
      onChange={handleSelectChange}
      {...rest}
    >
      <option value="" disabled>{disabledOption.label}</option>
      {options.map((option) => {
        return(
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )})}
    </select>
  );
};

export default SelectField;