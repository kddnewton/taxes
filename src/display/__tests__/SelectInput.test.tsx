import React from "react";
import { fireEvent, render } from "@testing-library/react";

import SelectInput from "../SelectInput";

type Value = "single" | "joint" | "head";
type Option = { label: string; value: Value };

const options: Option[] = [
  { label: "Single", value: "single" },
  { label: "Married Filing Jointly", value: "joint" },
  { label: "Head of Household", value: "head" }
];

test("calls back to onChange when the select value changes", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <SelectInput<Option> name="select" onChange={onChange} options={options}>
      Select
    </SelectInput>
  );

  const value = "joint";
  fireEvent.blur(getByRole("combobox"), { target: { value } });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(value);
});
