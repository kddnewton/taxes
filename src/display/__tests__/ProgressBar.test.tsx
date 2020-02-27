import React from "react";
import { render } from "@testing-library/react";

import ProgressBar from "../ProgressBar";

test("sets aria-valuenow", () => {
  const value = 50;
  const { getByRole } = render(<ProgressBar value={value} />);

  const progressBar = getByRole("progressbar");
  expect(progressBar.getAttribute("aria-valuenow")).toEqual(value.toString());
});
