# DECISIONS — Reversi 미결 설계점 (🗳 투표로 결정, 추측 금지)

각 봇은 자기 조각을 짜다 이 점에 부딪히면 `🗳 BALLOT`으로 올리고, tally가 `✅ RESULT`를 찍으면 그 결과로 구현한다. (규칙: `rules/agreed/06-loop-and-voting.md`)

## D1 · 패스 / 게임 종료  (S2·S3·S4)
둘 곳이 없는 쪽은 —
- **a** 패스하고, 양쪽이 연속으로 패스하면 게임 종료 (표준 오델로)
- **b** 즉시 게임 종료, 점수로 승자 결정
- **c** 막힌 쪽이 패배

LOCKED: ✅ RESULT D1|a — 연속 패스 2회면 게임 종료 (표준 오델로)

## D2 · 합법수 순서  (S2·S4)
`legal_moves()`의 반환 순서 (AI 결정론 tie-break에 쓰임) —
- **a** 좌표 스캔 (a1,b1,…)
- **b** 뒤집기 수 내림차순, 그다음 좌표
- **c** 코너/엣지 우선

LOCKED: ✅ RESULT D2|a — 좌표 스캔 a1→h8 순서

## D3 · 잘못된 수 처리 (run_match)  (S4)
플레이어가 불법 수를 내면 —
- **a** 그 플레이어 몰수패
- **b** 다시 요청 (1회)
- **c** 패스로 처리

LOCKED: ✅ RESULT D3|a — illegal move → 예외 처리 (몰수패)
