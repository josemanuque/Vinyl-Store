import React, { useState, useEffect } from 'react';
import { FormContext } from '../../contexts/FormContext';
import './forms.css';

type GenericFormProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  children: React.ReactNode;
};

const GenericForm = <T extends { [key: string]: any }>({ initialValues, onSubmit, children }: GenericFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({name, value});
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(values);
    e.preventDefault();

    const isValid = Object.values(values).every(value => value !== '' && value !== null && value !== undefined);

    if (!isValid) {
      alert('Please fill in all required fields.');
      return;
    }

    await onSubmit(values);
  };

  return (
    <FormContext.Provider value={{ values, handleChange, handleSubmit }}>
      <form onSubmit={handleSubmit} className='form-container'>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default GenericForm;