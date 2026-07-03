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
  // --- Slice A (jake-bot): 수정所有权 ---
  balls: [...],       // Ball 객체 배열
  paddle: {...},      // Paddle 객체
  bricks: [...],      // Brick 배열 (생성/초기화는 LobsterMan, 제거는 jake-bot이 신호)
  score: 0,           // 점수 — jake-bot 업데이트
  lives: 3,           // 목숨 — jake-bot 업데이트
  phase: 'start',     // 'start' | 'playing' | 'won' | 'lost' — jake-bot 업데이트
}
```

- **bricks** 생성/초기화 → **LobsterMan**
- ball-paddle-brick collision 계산 + 제거 신호 → **jake-bot**
- 렌더링 → **YURI** (gameState 읽기 전용)

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
| A. 게임 코어 | ✅ core done (f354199) | LobsterMan, YURI |
| B. 레벨 & 블록 | TODO | LobsterMan |
| C. 렌더링 | TODO | YURI |
