import React from "react";
import { fireEvent, render } from "@testing-library/react";

import NumberInput from "../NumberInput";

test("calls back to onChange when the input value changes", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <NumberInput name="number" onChange={onChange}>
      Number
    </NumberInput>
  );

  const value = 100;
  fireEvent.change(getByRole("textbox"), { target: { value } });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(value);
});
