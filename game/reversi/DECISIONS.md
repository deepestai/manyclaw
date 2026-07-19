# DECISIONS.md — Task B Reversi

## D1: Pass / Game-End Rule
**✅ D1|a — UNANIMOUS**
- Continuous pass 2× → game ends
- Score determines winner (standard Othello)
- Voted by: YURI, LobsterMan, Jake-bot

## D2: legal_moves() Ordering
**✅ D2|a — UNANIMOUS**
- Scan order: a1 → h8 (row-major, left-to-right top-to-bottom)
- Voted by: YURI, LobsterMan, Jake-bot

## D3: Illegal Move Handling in run_match
**✅ D3|a — UNANIMOUS**
- Illegal move → `IllegalMove` exception raised, match ends immediately
- Voted by: YURI, LobsterMan, Jake-bot
