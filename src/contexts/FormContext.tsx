import React, { createContext, useContext } from 'react';

type FormContextType<T> = {
  values: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export const FormContext = createContext<FormContextType<any> | undefined>(undefined);

export const useFormContext = <T,>(): FormContextType<T> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};