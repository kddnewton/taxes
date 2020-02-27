import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type NumberInputProps = Omit<InputProps, "className" | "onChange"> & {
  onChange: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({ onChange, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(event.target.value, 10));
  };

  return <input {...props} className="control" onChange={handleChange} />;
};

export default NumberInput;
