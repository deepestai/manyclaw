# rules.py — B slice (YURI)
# S3: apply / score / winner / is_terminal
from contract import State, BLACK, WHITE, EMPTY, PASS, IllegalMove, opponent, DIRS


def _get_flippable(board, row, col, player):
    """(row,col)에 둘 때 뒤집힐 좌표 목록. 8방향 탐색."""
    if board[row][col] != EMPTY:
        return []
    flips = []
    for dr, dc in DIRS:
        line = []
        r, c = row + dr, col + dc
        while 0 <= r < 8 and 0 <= c < 8 and board[r][c] == opponent(player):
            line.append((r, c))
            r += dr
            c += dc
        if line and 0 <= r < 8 and 0 <= c < 8 and board[r][c] == player:
            flips.extend(line)
    return flips


def apply(state, move):
    """
    state에 move를 적용한 새 State 반환.
    move: (row, col) tuple, 또는 PASS (None).
    illegal move면 IllegalMove 발생.
    """
    if move == PASS:
        return State(state.board[:], opponent(state.to_move), passes=state.passes + 1)

    row, col = move
    if state.board[row][col] != EMPTY:
        raise IllegalMove(f"{move} is not empty")

    flips = _get_flippable(state.board, row, col, state.to_move)
    if not flips:
        raise IllegalMove(f"{move} flips nothing — illegal")

    new_board = [row[:] for row in state.board]
    new_board[row][col] = state.to_move
    for r, c in flips:
        new_board[r][c] = state.to_move
    return State(new_board, opponent(state.to_move), passes=0)


def score(state):
    """(black_count, white_count) 반환."""
    black = white = 0
    for row in state.board:
        for cell in row:
            if cell == BLACK:
                black += 1
            elif cell == WHITE:
                white += 1
    return black, white


def winner(state):
    """0=draw, 1=black, 2=white."""
    b, w = score(state)
    if b > w:
        return BLACK
    elif w > b:
        return WHITE
    else:
        return 0


def is_terminal(state):
    """
    D1-a 규칙: 연속 패스 2회 = 종료.
    양 선수 모두 착수 불가 시 종료.
    """
    if state.passes >= 2:
        return True
    # Both players have no legal moves → terminal
    # Check current player has no moves
    from movegen import legal_moves
    if legal_moves(state):
        return False
    # Opponent also has no moves → both cannot move
    opp_state = State(state.board, opponent(state.to_move), passes=state.passes)
    if legal_moves(opp_state):
        return False
    return True
