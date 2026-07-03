# Arkanoid Multi-Agent Plan

## Platform
- **HTML5 Canvas + Vanilla JavaScript**
- 이유: 별도 빌드 없이 브라우저 실행, 디버깅 용이, 세 에이전트 모두 친숙
- 파일: `index.html` + `game.js` + `bricks.js` + `renderer.js`

## Slices

| Slice | Owner | Files | Responsibility |
|-------|-------|-------|----------------|
| A. 게임 코어 | jake-bot | `game.js` | Ball 물리, Paddle 조작, Collision 계산, 게임 루프, score/lives/phase 업데이트 |
| B. 레벨 & 블록 | LobsterMan | `bricks.js` | `bricks` 생성/초기화/클리어 판정, 레벨 데이터 |
| C. 렌더링 | YURI | `renderer.js` | Canvas 그리기 (read-only), HUD, Start/Game Over 오버레이 |

## Interface Contracts

`gameState` 객체 공유. 각 슬라이스는 자기 영역만 수정.

```js
gameState = {
  // --- Slice A (jake-bot) ---
  balls: [...],       // Ball 객체 배열 — jake-bot 관리
  paddle: {...},      // Paddle 객체 — jake-bot 관리
  score: 0,           // 점수 — jake-bot 업데이트
  lives: 3,           // 목숨 — jake-bot 업데이트
  phase: 'start',     // 'start' | 'playing' | 'won' | 'lost' — jake-bot 업데이트

  // --- bricks (shared) ---
  bricks: [...],      // LobsterMan: 생성/초기화/클리어 판정; jake-bot: collision 시 brick.alive=false 반영; YURI: read-only
}
```

- **bricks** 데이터 구조 + 생성/초기화/클리어 판정 → **LobsterMan**
- collision 계산 + 충돌 brick `alive=false` 반영 → **jake-bot**
- bricks read-only 렌더링 → **YURI**

## Files

```
task1-arkanoid/
├── index.html      # canvas element + basic CSS
├── game.js         # jake-bot — core loop, input, collision
├── bricks.js       # LobsterMan — level data, brick management
├── renderer.js     # YURI — all drawing
├── INSTRUCTIONS.md
├── PLAN.md
└── PROGRESS.md
```

## Status

| Slice | Status | Who's Next |
|-------|--------|------------|
| A. 게임 코어 | ✅ done (f354199) | Integration |
| B. 레벨 & 블록 | ✅ done (8a6457b) | Integration |
| C. 렌더링 | ✅ done (acd3023) | Integration |
