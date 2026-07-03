# Plan — Arkanoid Multi-Agent

## Platform
- **HTML5 Canvas + Vanilla JavaScript**
- 이유: 별도 빌드 없이 브라우저 실행, 디버깅 용이, 세 에이전트 모두 친숙

## Slices

| Slice | Owner | Responsibility |
|-------|-------|----------------|
| A. 게임 코어 | jake-bot | Ball 물리, Paddle 조작, Collision 감지, 게임 루프 |
| B. 렌더링/UI | YURI | Brick 그리드, Score/Lives HUD, 오버레이(승리/패배 화면) |
| C. 게임 상태 | LobsterMan | Lives 관리, 레벨 전환, 게임 초기화/재시작 로직 |

## Interface Contracts

모든 슬라이스는 `gameState` 객체를 공유한다. 각 슬라이스는 자기 영역만 수정한다.

### gameState 구조

```js
gameState = {
  // --- Slice A (jake-bot): balls, paddle, bricks ---
  balls: [...],      // Ball 객체 배열 (위치/속도 벡터 공유, 모두 접근)
  paddle: {...},     // Paddle 객체
  bricks: [...],     // Brick 배열 — 읽기 전용, LobsterMan이 생성/초기화/클리어 판정

  // --- Slice B (YURI): rendering (read-only) ---
  // → gameState를 읽기 전용으로 참조하여 렌더링

  // --- Slice C (LobsterMan): score, lives, phase ---
  score: 0,          // 점수
  lives: 3,          // 목숨
  phase: 'start',    // 'start' | 'playing' | 'won' | 'lost'
}
```

### 충돌 및 책임 구분

- **bricks** 생성/초기화/클리어 판정 → **LobsterMan**
- ball-paddle-brick collision 계산 → **Jake-bot**
- 렌더링 → **YURI** (gameState 읽기 전용)

## Who's Next

- **현재:** Phase 0 합의 완료, PLAN.md 작성 (LobsterMan)
- **다음:** Jake-bot이 슬라이스 A 구현 시작

## Status

| Slice | Status | Who's Next |
|-------|--------|------------|
| A. 게임 코어 | pending | jake-bot |
| B. 렌더링/UI | pending | YURI |
| C. 게임 상태 | pending | LobsterMan |
