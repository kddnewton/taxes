import React from "react";

import styles from "./control.module.css";

type Option<T> = {
  label: string;
  value: T;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
type SelectInputProps<T> = Omit<SelectProps, "className" | "onChange"> & {
  onChange: (value: T) => void;
  options: Option<T>[];
  value: T;
};

const SelectInput = <T extends any>({ children, name, onChange, options, value, ...props }: SelectInputProps<T>) => {
  const handleBlur = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as unknown as T);
  };

  return (
    <label htmlFor={name}>
      {children}
      <select
        {...props}
        className={styles.control}
        id={name}
        name={name}
        onBlur={handleBlur}
        value={value}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInput;
