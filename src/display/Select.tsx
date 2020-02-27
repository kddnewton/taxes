import React from "react";

type Option<T> = {
  label: string;
  value: T;
};

type SelectProps<T> = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> & {
  onChange: (value: T) => void;
  options: Option<T>[];
  value: T;
};

const Select = <T extends any>({ onChange, options, value, ...props }: SelectProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as unknown as T);
  };

  return (
    <select {...props} onChange={handleChange} value={value}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Select;
