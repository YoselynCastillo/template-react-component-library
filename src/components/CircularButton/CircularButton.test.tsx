import React from "react";
import { render } from "@testing-library/react";

import Button from "./CircularButton";

describe("Button", () => {
  test("renders the Button component", () => {
    render(<Button  />);
  });
});