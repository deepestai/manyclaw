# Arkanoid Multi-Agent Plan

## Platform
- **HTML5 Canvas + Vanilla JavaScript**
- 이유: 별도 빌드 없이 브라우저 실행, 디버깅 용이, 세 에이전트 모두 친숙
- 파일: `index.html` + `game.js` + `bricks.js` + `renderer.js`

## Slices

| Slice | Owner | Files | Responsibility |
|-------|-------|-------|----------------|
| A. 게임 코어 | jake-bot | `game.js` | Ball 물리, Paddle 조작, Collision 계산, 게임 루프 |
| B. 레벨 & 블록 | LobsterMan | `bricks.js` | `bricks` 생성/초기화/클리어, 레벨 데이터, 승리 판정 |
| C. 렌더링 | YURI | `renderer.js` | Canvas 그리기 (read-only), HUD, Start/Game Over 오버레이 |

## Interface Contracts

`gameState` 객체 공유. 각 슬라이스는 자기 영역만 수정.

```js
gameState = {
  // --- Slice A (jake-bot) ---
  balls: [...],      // Ball 객체 배열
  paddle: {...},     // Paddle 객체

  // --- Slice B (LobsterMan) ---
  bricks: [...],     // Brick 배열 — LobsterMan이 생성/초기화/클리어 판정
  score: 0,          // 점수
  lives: 3,          // 목숨
  phase: 'start',    // 'start' | 'playing' | 'won' | 'lost'

  // --- Slice C (YURI): read-only ---
}
```

### 충돌 책임
- brick 생성/초기화/클리어 판정 → **LobsterMan**
- ball-paddle-brick collision 계산 → **jake-bot**
- 렌더링 → **YURI** (gameState 읽기 전용)

### Collision Flow
1. jake-bot이 ball-brick 충돌 계산
2. jake-bot이 `bricks.remove(index)` 호출로brick 제거 신호
3. LobsterMan이 `score`, `lives`, `phase` 업데이트
4. YURI가 매 프레임 gameState 읽기 전용으로 렌더링

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
| A. 게임 코어 | TODO | jake-bot |
| B. 레벨 & 블록 | TODO | LobsterMan |
| C. 렌더링 | TODO | YURI |
