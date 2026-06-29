# Arkanoid — Brick Breaker Game Specification

## Platform
- **HTML5 Canvas + JavaScript** (single file)
- Reason: Zero installation, runs in any modern browser, easy to share/distribute
- No external dependencies

## How to Run
Open `index.html` in any browser. No server required.

---

## Game Overview
Classic Breakout/Arkanoid brick-breaker game. Control a paddle to bounce a ball and break all bricks.

---

## Visual Design

### Canvas
- Width: 800px, Height: 600px
- Background: Dark navy (#1a1a2e)

### Paddle
- Width: 100px, Height: 15px
- Color: Cyan gradient (#00d4ff → #0099cc)
- Position: Bottom of canvas, 30px from bottom
- Rounded corners (border-radius: 5px)

### Ball
- Radius: 10px
- Color: White (#ffffff) with subtle glow
- Initial speed: 5px/frame, increases slightly over time

### Bricks
- Grid: 10 columns × 5 rows
- Brick size: 70px × 25px, gap: 5px
- Colors by row (top to bottom):
  - Row 1: #ff6b6b (red)
  - Row 2: #ffa502 (orange)
  - Row 3: #ffd93d (yellow)
  - Row 4: #6bcb77 (green)
  - Row 5: #4d96ff (blue)
- Top padding: 50px, left padding: centered

### UI
- Score: Top-left, white text, font: 20px monospace
- Lives: Top-right, shown as ball icons (max 3)
- Game Over / Victory: Centered overlay text

---

## Game Mechanics

### Paddle Control
- Mouse movement (paddle follows cursor X)
- Keyboard: Left/Right arrow keys move paddle
- Paddle constrained to canvas bounds

### Ball Physics
- Bounces off walls (left, right, top)
- Bounces off paddle — angle depends on hit position (left side = leftward, right side = rightward)
- Bounces off bricks — destroys brick, reverses appropriate velocity component
- Falls below paddle = lose life

### Scoring
- Each brick: 10 points
- Score displayed continuously

### Lives
- Start with 3 lives
- Lose 1 life when ball falls below paddle
- Ball resets to paddle, press Space or click to launch
- 0 lives = Game Over

### Win Condition
- All bricks destroyed = Victory

### Speed Progression
- Ball speed increases by 0.5% after each brick destroyed
- Max speed cap at 2× initial speed

---

## Game States
1. **Ready** — Ball on paddle, "Click or press Space to start" shown
2. **Playing** — Ball in motion, active gameplay
3. **Paused** — (optional) Press P to pause
4. **Game Over** — 0 lives, show final score, "Press R to restart"
5. **Victory** — All bricks cleared, show final score, "Press R to restart"

---

## Controls
| Input | Action |
|-------|--------|
| Mouse move | Move paddle |
| Left/Right arrows | Move paddle |
| Space / Click | Launch ball (when ready) |
| R | Restart game (when game over/victory) |

---

## Audio
- No audio (keep it simple, avoids autoplay issues)

---

## Acceptance Criteria
- [ ] Paddle moves smoothly with mouse and keyboard
- [ ] Ball bounces correctly off walls, paddle, and bricks
- [ ] Bricks are destroyed on ball contact
- [ ] Score increments correctly (10 per brick)
- [ ] Lives decrease when ball falls; game over at 0 lives
- [ ] Victory screen when all bricks cleared
- [ ] Game restarts cleanly with R key
- [ ] Ball angle varies based on paddle hit position
- [ ] Ball speed gradually increases
