import { fireEvent, render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import { TicTacToe } from "../src/App";

test("plays tic-tac-toe", async () => {
  const ui = render(() => <TicTacToe />);

  fireEvent.click(ui.getByLabelText("top left"));
  fireEvent.click(ui.getByLabelText("top right"));
  fireEvent.click(ui.getByLabelText("middle"));
  fireEvent.click(ui.getByLabelText("right"));
  fireEvent.click(ui.getByLabelText("bottom right"));

  expect(ui.getByLabelText("game state").textContent)
    .toBe("X wins!");
});
