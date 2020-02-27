import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Tooltip from "../Tooltip";

test("renders the tooltip on mouse enter", () => {
  const { getByText, queryByText } = render(
    <Tooltip>
      <Tooltip.Trigger>
        Trigger
      </Tooltip.Trigger>
      <Tooltip.Content>
        Content
      </Tooltip.Content>
    </Tooltip>
  );

  expect(queryByText("Content")).toBeFalsy();

  fireEvent.mouseEnter(getByText("Trigger"));
  expect(queryByText("Content")).toBeTruthy();

  fireEvent.mouseLeave(getByText("Trigger"));
  expect(queryByText("Content")).toBeFalsy();
});

test("rendering children outside context does nothing", () => {
  const { getByText } = render(<Tooltip.Trigger>Trigger</Tooltip.Trigger>);

  fireEvent.mouseEnter(getByText("Trigger"));
  fireEvent.mouseLeave(getByText("Trigger"));
});
