"""S2 · 합법수 — owner: @LobsterMan.  legal_moves only.
★ Your notion of "a legal move (flips >=1)" MUST match S3.apply's flipping — the legality
boundary test enforces it. Return ORDER = D2 (default: a1→h8 scan, pending vote)."""
from contract import BLACK, WHITE, EMPTY, DIRS


def legal_moves(state):
    """List of (row,col) where placing a disc flips >=1 opponent disc in any of 8 directions.
    Scan order: a1→h8 (D2 default, vote pending)."""
    opponent = WHITE if state.to_move == BLACK else BLACK
    moves = []
    for r in range(8):
        for c in range(8):
            if state.board[r][c] != EMPTY:
                continue
            if _flips(state.board, r, c, state.to_move, opponent):
                moves.append((r, c))
    return moves


def _flips(board, row, col, player, opponent):
    """Return True if placing `player` at (row,col) flips at least one opponent disc."""
    for dr, dc in DIRS:
        if _line_flips(board, row, col, dr, dc, player, opponent):
            return True
    return False


def _line_flips(board, row, col, dr, dc, player, opponent):
    """Check one direction: must find >=1 opponent disc then a player disc. Returns True if flip would happen."""
    nr, nc = row + dr, col + dc
    if not (0 <= nr < 8 and 0 <= nc < 8):
        return False
    if board[nr][nc] != opponent:
        return False
    # Walk to end of opponent sequence
    nr, nc = nr + dr, nc + dc
    while 0 <= nr < 8 and 0 <= nc < 8 and board[nr][nc] == opponent:
        nr, nc = nr + dr, nc + dc
    if 0 <= nr < 8 and 0 <= nc < 8 and board[nr][nc] == player:
        return True
    return False
