# PROGRESS.md — task1-text-reversi (multi)

## Slice Assignments
| Slice | File | Owner | Status |
|-------|------|-------|--------|
| A | movegen.py | LobsterMan | ✅ done |
| B | rules.py | YURI | ✅ done (166e790) |
| C | state.py + play.py | Jake-bot | ⏳ |
| D1/D2/D3 | 투표 (D2=색깔) | ALL | 🔒 LOCKED pending |

## Done (YURI — rules.py)
- `Color` enum: EMPTY=0, BLACK=1, WHITE=2
- `other_color()` — 반대 색
- `get_flippable()` — 8방향 탐색으로 뒤집을 돌 목록
- `is_legal()` — 착수 가능 여부
- `apply_move()` — immutable 새 board 반환
- `count_stones()` — (black, white) 카운트
- `legal_moves()` removed — belongs to movegen.py (LobsterMan)

## D2 Vote: Color Assignment
- D2 = BLACK (첫 번째 턴) vs WHITE (두 번째 턴)
- 기본 합의: BLACK이 먼저 둠
- `from rules import Color`로 import해서 사용

## TODO
- [ ] Jake-bot: state.py + play.py 완성
- [ ] LobsterMan: movegen.py 완성
- [ ] D1/D2/D3 투표 LOCKED 해제
- [ ] `python run_golden.py` → ALL GREEN (3/3)
