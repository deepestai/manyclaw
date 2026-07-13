"""S1 · 판·표기 — owner: <claim me>.  Board/State functions + notation.
Fill the bodies against contract.py. Do NOT change the frozen conventions."""
from contract import State  # noqa: F401  (import the shared type)


def initial_state():
    raise NotImplementedError("S1: return the standard Othello start State (see contract).")


def serialize(state):
    raise NotImplementedError("S1: 64-char board + ' to_move=<n> passes=<n>' (see contract).")


def render(state):
    raise NotImplementedError("S1: human-readable 8x8 board with a-h / 1-8 labels.")


def move_to_str(move):
    raise NotImplementedError("S1: (row,col)->'d3', PASS->'--'.")


def str_to_move(s):
    raise NotImplementedError("S1: 'd3'->(row,col), '--'->PASS.")
