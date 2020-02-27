import React from "react";
import { render } from "@testing-library/react";

import Gutter from "../Gutter";

test("renders a gutter with the specified height", () => {
  const { container } = render(<Gutter height={5} />);
  const gutter = container.firstChild as HTMLElement;

  expect(gutter.style).toHaveProperty("height");
});
