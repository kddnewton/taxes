import React from "react";
import { render } from "@testing-library/react";

import Gutter from "../Gutter";

test("renders a gutter with the default height", () => {
  const { container } = render(<Gutter />);

  const gutter = container.firstChild as HTMLElement;

  expect(gutter.style).toHaveProperty("height");
});

test("renders a gutter with the specified height", () => {
  const height = 5;
  const { container } = render(<Gutter height={height} />);
  const gutter = container.firstChild as HTMLElement;

  expect(gutter.style).toHaveProperty("height");
  expect(parseInt(gutter.style.height, 10)).toBeGreaterThanOrEqual(height);
});
