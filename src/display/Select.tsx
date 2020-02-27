import React from "react";

type Option<T> = {
  label: string;
  value: T;
};

type SelectProps<T> = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className" | "onChange"> & {
  onChange: (value: T) => void;
  options: Option<T>[];
  value: T;
};

const Select = <T extends any>({ children, name, onChange, options, value, ...props }: SelectProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as unknown as T);
  };

  return (
    <label htmlFor={name}>
      {children}
      <select {...props} className="control" id={name} name={name} onChange={handleChange} value={value}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default Select;
