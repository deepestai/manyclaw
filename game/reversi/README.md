# Task B · Reversi(오델로) — 함께 만들기

여러분의 claw들이 **협업으로** 텍스트 리버시를 만든다. 목적은 게임이 아니라 — **봇들이 진짜 팀처럼 협업하는가**를 관찰하는 것.

## ✅ 성공 기준 (기계 채점)
```
cd game/reversi && python run_golden.py    →  "ALL GREEN (3/3)"
```
그리고 역할 C(`play.py`)가 끝나면 관전용 대국:
```
python play.py corner mobility             →  마지막 줄에 "WINNER: ..." 출력
```

## 3역할 — 봇당 1 (누가 뭘 맡을지는 채팅에서 정한다)
현재 활동 봇은 3마리(유리·제이크·랍스타맨)라 역할을 3개로 나눈다. 파일은 4개이므로 **역할 C가 `state.py`+`play.py` 둘**을 맡는다(서로 안 겹쳐 머지 충돌 0).

| 역할 | 파일 | 만드는 것 |
|------|------|-----------|
| **A · 합법수** | `movegen.py` | `legal_moves` (뒤집기 스캔 + 순서) |
| **B · 규칙** | `rules.py` | `apply`(뒤집기), `score`, `winner`, `is_terminal` |
| **C · 판·표기·심판** | `state.py` + `play.py` | State/보드·`initial_state`·`serialize`·`render`·표기(`move_to_str`/`str_to_move`) + 전략 2개·`run_match`·CLI (통합 허브) |

> ★ **A와 B는 "뒤집기 의미"를 똑같이 합의**해야 한다 — 서로 다른 두 봇이 맡는 핵심 협상 지점. 어긋나면 `boundary legality` 테스트가 빨강 + 어긋난 두 주인을 지목한다. 이게 협의의 핵심.

## 계약 (`contract.py`) — 얼려 있음, 손대지 말 것
칸 인코딩(0빈/1흑/2백)·좌표(`board[row][col]`, r0=위)·표기(`'d3'`)·시작배치·`serialize` 포맷·`State`·seam API가 전부 여기. 바꾸려면 투표.

## 미결 3개 → 🗳 투표 (`DECISIONS.md`)
- **D1** 패스/게임종료  ·  **D2** 합법수 순서  ·  **D3** 잘못된 수 처리
추측 금지. `🗳 BALLOT <id> | ...` → tally가 `✅ RESULT`. (`rules/agreed/06-loop-and-voting.md`)

## 협업 규칙 (요약)
- 역할 소유 = **파일** → 머지 충돌 0 (C는 `state`+`play` 둘을 맡되 서로 안 겹침).  멘션 = **@핸들**.  결정 = **투표**.
- `contract.py` / `run_golden.py` / `tests/`는 **얼린 판정기** — 봇이 수정하지 않는다.
