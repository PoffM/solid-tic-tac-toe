import { Circle, X } from "lucide-solid";
import { For, createEffect } from "solid-js";
import { createMutable } from "solid-js/store";

import "./index.css";

type Player = "X" | "O";

type Cell = " " | Player;

interface Win {
  player: Player | "Tie";
  line: number[][];
}

interface Store {
  turn: Player;
  winner: Win | null;
  rows: Cell[][];
}

function initGame(): Store {
  return {
    turn: "X",
    winner: null,
    rows: [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  };
}

const store = createMutable<Store>(initGame());

function makeMove(row: number, col: number) {
  if (store.rows[row][col] !== " ") {
    return;
  }
  if (store.winner) {
    return;
  }

  // Place mark
  store.rows[row][col] = store.turn;

  // Check for winner
  for (const line of STRAIGHT_LINES) {
    const cells = line.map(([y, x]) => store.rows[y][x]);
    for (const player of ["X", "O"] as Player[]) {
      if (cells.every((cell) => cell === player)) {
        store.winner = { player, line: line };
        return;
      }
    }
  }
  // Check for winner
  if (store.rows.every((row) => row.every((cell) => cell !== " "))) {
    store.winner = { player: "Tie", line: [] };
    return;
  }

  // Change turn
  store.turn = store.turn === "X" ? "O" : "X";
}

function label(y: number, x: number) {
  const p1 = ["top", "", "bottom"][y];
  const p2 = ["left", "", "right"][x];
  const text = [p1, p2].filter(Boolean).join(" ") || "middle";
  return text;
}

export function TicTacToe() {
  return (
    <div class="fixed inset-0 bg-neutral-900 text-neutral-200 flex flex-col gap-2 justify-center items-center">
      <div class="w-[300px] h-[300px] border flex flex-col relative">
        <For each={store.rows}>
          {(row, y) => (
            <div class="flex">
              <For each={row}>
                {(cell, x) => (
                  <button
                    class="w-[100px] h-[100px] border flex justify-center items-center"
                    classList={{
                      "hover:bg-neutral-800": cell === " " && !store.winner,
                    }}
                    aria-label={label(y(), x())}
                    onClick={() => makeMove(y(), x())}
                  >
                    {cell !== " " && (
                      <div class="animate-popIn">
                        <Mark player={cell} />
                      </div>
                    )}
                  </button>
                )}
              </For>
            </div>
          )}
        </For>
        {store.winner && store.winner.player !== "Tie" && (
          <div class="absolute h-full w-full">
            <svg height="300" width="300">
              <polyline
                classList={{
                  "stroke-blue-500": store.winner.player === "X",
                  "stroke-red-500": store.winner.player === "O",
                }}
                points={store.winner.line
                  .map(([y, x]) => `${x * 100 + 50},${y * 100 + 50}`)
                  .join(" ")}
                fill="none"
                stroke-linecap="round"
                stroke-width="5"
              />
            </svg>
          </div>
        )}
      </div>
      <div aria-label="game state">
        {store.winner &&
          (store.winner?.player === "Tie" ? (
            "Tie!"
          ) : (
            <div class="flex items-center gap-1">
              <Mark player={store.winner.player} /> wins!
            </div>
          ))}
        {!store.winner && (
          <div class="flex items-center gap-1">
            <Mark player={store.turn} />
            's turn
          </div>
        )}
      </div>
      <div class="mt-4">
        {!store.winner && (
          <button
            class="bg-teal-900 text-white px-4 py-2 rounded-md"
            onClick={() => Object.assign(store, initGame())}
          >
            Restart game
          </button>
        )}
        {store.winner && (
          <button
            class="bg-green-800 text-white px-4 py-2 rounded-md"
            onClick={() => Object.assign(store, initGame())}
          >
            Play again
          </button>
        )}
      </div>
    </div>
  );
}

interface MarkProps {
  player: Player;
}

function Mark(props: MarkProps) {
  return (
    <span
      class="w-[50px] h-[50px] flex justify-center items-center"
      classList={{
        "text-blue-500": props.player === "X",
        "text-red-500": props.player === "O",
      }}
    >
      <span class="sr-only">{props.player}</span>
      {props.player === "X" ? <X size={50} /> : <Circle size={40} />}
    </span>
  );
}

const STRAIGHT_LINES: number[][][] = (() => {
  const lines = [];

  // rows
  for (let y = 0; y < 3; y++) {
    const line: number[][] = [];
    for (let x = 0; x < 3; x++) {
      line.push([y, x]);
    }
    lines.push(line);
  }

  // cols
  for (let y = 0; y < 3; y++) {
    const line: number[][] = [];
    for (let x = 0; x < 3; x++) {
      line.push([x, y]);
    }
    lines.push(line);
  }

  // diags
  const diag1: number[][] = [];
  for (let i = 0; i < 3; i++) {
    diag1.push([i, i]);
  }
  lines.push(diag1);

  const diag2: number[][] = [];
  for (let i = 0; i < 3; i++) {
    diag2.push([i, 2 - i]);
  }
  lines.push(diag2);

  return lines;
})();
