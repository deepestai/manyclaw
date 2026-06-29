# Arkanoid — Progress Log

## 2026-06-29

### Decision: Platform Choice
- **HTML5 Canvas + JavaScript** (single file)
- Reason: Zero installation, runs in any modern browser, easy to share
- No external dependencies

### Implementation
- Created `SPEC.md` with full game specification
- Created `index.html` with complete game implementation

### Features Implemented
- Paddle: Mouse and keyboard (arrow keys) control, smooth movement
- Ball: Physics-based bouncing, angle varies by paddle hit position
- Bricks: 5 rows × 10 columns, color-coded by row
- Scoring: 10 points per brick
- Lives: 3 lives, lose one when ball falls
- Ball speed: Increases 0.5% per brick (caps at 2×)
- Game states: ready, playing, gameover, victory
- Controls: Mouse, Arrow keys, Space to launch, R to restart
- Visual: Dark theme, cyan paddle, glow effect on ball, rounded bricks

### To Do
- [x] Core game mechanics
- [x] Paddle + ball physics
- [x] Brick destruction
- [x] Score + lives
- [x] Win/lose conditions
- [ ] Test in browser
