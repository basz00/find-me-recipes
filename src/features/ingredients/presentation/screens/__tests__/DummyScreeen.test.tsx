import "setimmediate";
import { render, screen, fireEvent } from "@/test-utils/test-utils";
import React from "react";
import { DummyScreen } from "../DummyScreen";

test("examples of some things", async () => {
  const expectedUsername = "Ada Lovelace";

  render(<DummyScreen />);

  fireEvent.changeText(screen.getByTestId("input"), expectedUsername);
  fireEvent.press(screen.getByText("Print Username"));

  // Using `findBy` query to wait for asynchronous operation to finish
  const usernameOutput = await screen.findByTestId("printed-username");

  // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
  expect(usernameOutput).toHaveTextContent(expectedUsername);

  expect(screen.toJSON()).toMatchSnapshot();
});
