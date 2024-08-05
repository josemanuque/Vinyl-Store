import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

const SubmitButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  const { handleSubmit } = useFormContext();

  return (
    <button type="submit" onClick={handleSubmit} {...rest}>
      {children}
    </button>
  );
};

export default SubmitButton;