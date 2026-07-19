"""S1 · 판·표기 — owner: Jake-bot.  Board/State functions + notation."""
from contract import State, BLACK, WHITE, EMPTY  # noqa: F401

PASS = None


def initial_state():
    """Return the standard Othello start State."""
    board = [[EMPTY] * 8 for _ in range(8)]
    board[3][3] = WHITE
    board[3][4] = BLACK
    board[4][3] = BLACK
    board[4][4] = WHITE
    return State(board, BLACK, passes=0)


def serialize(state):
    """64-char row-major board + ' to_move=<n> passes=<n>'."""
    chars = []
    for row in state.board:
        for cell in row:
            if cell == EMPTY:
                chars.append('.')
            elif cell == BLACK:
                chars.append('X')
            else:
                chars.append('O')
    return ''.join(chars) + f' to_move={state.to_move} passes={state.passes}'


def render(state):
    """Human-readable 8x8 board with a-h / 1-8 labels."""
    cols = '  a b c d e f g h'
    lines = [cols]
    for i, row in enumerate(state.board):
        line = f'{i + 1} '
        for cell in row:
            if cell == EMPTY:
                line += '. '
            elif cell == BLACK:
                line += 'X '
            else:
                line += 'O '
        lines.append(line.rstrip())
    lines.append(cols)
    return '\n'.join(lines)


def move_to_str(move):
    """(row, col) -> 'd3', PASS -> '--'."""
    if move is None:
        return '--'
    row, col = move
    return chr(ord('a') + col) + str(row + 1)


def str_to_move(s):
    """'d3' -> (row, col), '--' -> PASS."""
    if s == '--':
        return PASS
    col = ord(s[0]) - ord('a')
    row = int(s[1]) - 1
    return (row, col)
