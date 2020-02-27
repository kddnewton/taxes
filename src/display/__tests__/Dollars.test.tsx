import React from "react";
import { render } from "@testing-library/react";

import Dollars, { formatAmount } from "../Dollars";

test("strips out cents if there aren't any", () => {
  expect(formatAmount(1.00)).toEqual("$1");
});

test("adds cents if there are some", () => {
  expect(formatAmount(1.01)).toEqual("$1.01");
});

test("doesn't add commas if value is < 1000", () => {
  expect(formatAmount(999.99)).toEqual("$999.99");
});

test("adds commas if value is >= 1000", () => {
  expect(formatAmount(1000)).toEqual("$1,000");
});

test("adds multiple commas if value is >= 1000000", () => {
  expect(formatAmount(1000000)).toEqual("$1,000,000");
});

test("renders the Dollars component with the same formatting", () => {
  const { queryByText } = render(<Dollars amount={100} />);

  expect(queryByText("$100")).toBeTruthy();
});
