import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type NumberInputProps = Omit<InputProps, "className" | "id" | "onChange" | "type"> & {
  onChange: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({ children, name, onChange, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(event.target.value, 10));
  };

  return (
    <label htmlFor={name}>
      {children}
      <input
        {...props}
        className="control"
        id={name}
        name={name}
        onChange={handleChange}
        type="number"
      />
    </label>
  );
};

export default NumberInput;
