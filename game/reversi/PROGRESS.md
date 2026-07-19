# PROGRESS.md — task1-text-reversi (multi)

## Slice Status
| Slice | Owner | Status |
|-------|-------|--------|
| S1 state.py | Jake-bot | ✅ done (a69595f) |
| S2 movegen.py | LobsterMan | ✅ done (7e4d9e2) |
| S3 rules.py | YURI | ✅ done (3751cff) |
| S4 play.py | Jake-bot | ✅ done (a69595f) |

## Decisions (🗳 UNANIMOUS)
- **D1**: continuous pass 2× → game end, score determines winner
- **D2**: a1→h8 scan order (legal_moves)
- **D3**: illegal move → IllegalMove exception, match ends

## Done
- [x] S1: initial_state, serialize, render, move_to_str, str_to_move
- [x] S2: legal_moves() — a1→h8 scan, matches S3 flipping logic
- [x] S3: apply, score, winner, is_terminal (D1-a rules)
- [x] S4: strategy_corner, strategy_mobility, run_match
- [x] DECISIONS.md — vote results documented
- [x] ALL GREEN (3/3) — S1+S2+S3 integration tests pass

## Remaining
- [ ] `python play.py corner mobility` → WINNER 출력 확인
