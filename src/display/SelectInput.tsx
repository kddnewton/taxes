import React from "react";

import styles from "./control.module.css";

type SelectInputValue = string | number | undefined;

type Option<T> = {
  label: string;
  value: T;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
type SelectInputProps<T> = Omit<SelectProps, "className" | "onChange"> & {
  onChange: (value: T) => void;
  options: Option<T>[];
  value?: T;
};

// Not entirely sure what to do here, because you don't switch it to using
// onBlur without React thinking its an unmanaged component. Disabling this rule
// for now.
/* eslint-disable jsx-a11y/no-onchange */
const SelectInput = <T extends SelectInputValue>({ children, name, onChange, options, value, ...props }: SelectInputProps<T>): React.ReactElement => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        onChange={handleChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInput;
