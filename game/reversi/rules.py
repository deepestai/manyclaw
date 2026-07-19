# rules.py — B slice (YURI)
# 리버시 게임 규칙: 착수 가능 여부 판단, 팔레트 투표

from enum import IntEnum
from typing import List, Tuple


class Color(IntEnum):
    EMPTY = 0
    BLACK = 1  # 먼저 둘 (D2 투표 결과)
    WHITE = 2


def other_color(color: Color) -> Color:
    return WHITE if color == BLACK else BLACK


def get_flippable(
    board: List[List[Color]],
    row: int,
    col: int,
    color: Color
) -> List[Tuple[int, int]]:
    """
    (row, col)에 둘 때 뒤집힐 수 있는 돌 목록을 반환.
    8방향 탐색.
    """
    if board[row][col] != Color.EMPTY:
        return []

    n = len(board)
    flips = []
    directions = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]

    for dr, dc in directions:
        line = []
        r, c = row + dr, col + dc
        while 0 <= r < n and 0 <= c < n and board[r][c] == other_color(color):
            line.append((r, c))
            r += dr
            c += dc
        if len(line) > 0 and 0 <= r < n and 0 <= c < n and board[r][c] == color:
            flips.extend(line)

    return flips


def is_legal(board: List[List[Color]], row: int, col: int, color: Color) -> bool:
    """(row, col)에 color 돌을 둘 수 있는지."""
    return len(get_flippable(board, row, col, color)) > 0


def legal_moves(board: List[List[Color]], color: Color) -> List[Tuple[int, int]]:
    """color 돌이 둘 수 있는 모든 좌표 목록 (a1~h8 스캔)."""
    n = len(board)
    moves = []
    for r in range(n):
        for c in range(n):
            if is_legal(board, r, c, color):
                moves.append((r, c))
    return moves


def apply_move(
    board: List[List[Color]],
    row: int,
    col: int,
    color: Color
) -> List[List[Color]]:
    """(row, col)에 두면서 뒤집고, 새 board 반환 (immutable)."""
    flips = get_flippable(board, row, col, color)
    if not flips:
        raise ValueError(f"Illegal move: ({row}, {col})")

    new_board = [row[:] for row in board]
    new_board[row][col] = color
    for r, c in flips:
        new_board[r][c] = color
    return new_board


def count_stones(board: List[List[Color]]) -> Tuple[int, int]:
    """(검은돌 수, 흰돌 수) 반환."""
    black = white = 0
    for row in board:
        for cell in row:
            if cell == Color.BLACK:
                black += 1
            elif cell == Color.WHITE:
                white += 1
    return black, white
