"""FROZEN contract for the manyclaw Task B Reversi build.
Every seam imports from here. Do NOT edit — the only open points are in DECISIONS.md (decide by 🗳 vote).

Board convention (FROZEN):
  Cell: 0 EMPTY / 1 BLACK ('X') / 2 WHITE ('O').  Black moves first.
  board[row][col]; row 0 = TOP, col 0 = LEFT (0..7).
  Notation: column a-h (a=col0) + row 1-8 (1=row0). e.g. 'd3' = (row 2, col 3). PASS = '--'.
  Initial (standard Othello): board[3][3]=WHITE, board[3][4]=BLACK, board[4][3]=BLACK, board[4][4]=WHITE.
  serialize(state) = 64-char row-major board using '.','X','O', then ' to_move=<n> passes=<n>'.
A Move is a (row, col) tuple, or PASS.

Seam API (bodies are the stubs in state/movegen/rules/play — fill them):
  S1 state.py   : initial_state()->State ; serialize(State)->str ; render(State)->str ;
                  move_to_str(move)->str ; str_to_move(str)->move
  S2 movegen.py : legal_moves(State)->list[Move]   (cells where playing flips >=1 opponent disc)
  S3 rules.py   : apply(State, Move)->State (raise IllegalMove if not legal) ; score(State)->(black,white) ;
                  winner(State)->0|1|2 ; is_terminal(State)->bool
  S4 play.py    : strategy_corner(State)->Move ; strategy_mobility(State)->Move ;
                  run_match(playerA, playerB)->dict ; main()

Open points — decide by a 🗳 vote, do NOT guess (see DECISIONS.md):
  D1 pass / game-end rule ; D2 legal_moves() ordering ; D3 illegal-move handling in run_match.
"""

EMPTY, BLACK, WHITE = 0, 1, 2
PASS = None
DIRS = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


class IllegalMove(Exception):
    """Raised by rules.apply when a move is not legal."""


class State:
    """board: 8x8 list of Cell ints; to_move: BLACK|WHITE; passes: consecutive-pass count."""
    __slots__ = ("board", "to_move", "passes")

    def __init__(self, board, to_move, passes=0):
        self.board = board
        self.to_move = to_move
        self.passes = passes


def opponent(p):
    return WHITE if p == BLACK else BLACK
