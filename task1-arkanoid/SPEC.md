# Arkanoid — SPEC.md

## 1. Project Overview
- **Type:** Single HTML file brick-breaker game
- **Core:** Paddle + ball + bricks, keyboard control, lives + score, win/lose conditions
- **Target:** Desktop browsers (Chrome/Firefox/Safari modern versions)

## 2. Visual & Rendering
- Canvas 800×600, centered on page
- Dark background (#1a1a2e), neon-style colored bricks
- Paddle: white rectangle, 100×12px
- Ball: white circle, radius 8px
- Bricks: 8 cols × 5 rows, each brick 75×20px, rainbow row colors
- Score top-left, lives top-right, both white text
- Game-over / win overlay with restart prompt

## 3. Physics
- Ball speed: 5px/frame initial, slight increase over time
- Ball angle: depends on where it hits the paddle (center = straight up, edges = angled)
- Wall bounces: left/right/top walls
- Bottom: lose life, ball resets to paddle
- Brick collision: ball reverses Y direction, brick removed, score +10

## 4. Interaction
- **Left/Right arrow keys** or **A/D**: move paddle
- **Space**: launch ball from paddle (when ball is attached)
- **Enter/Space on game-over**: restart

## 5. Game States
- `start`: ball attached to paddle, "Press Space" message
- `playing`: ball in motion
- `gameover`: all lives lost, show score, "Press Enter to restart"
- `win`: all bricks cleared, show score, "Press Enter to restart"

## 6. Acceptance Criteria
- [ ] Ball bounces off walls and paddle correctly
- [ ] Bricks disappear on hit, score increments
- [ ] Lives decrement when ball hits bottom
- [ ] Game over when lives = 0
- [ ] Win when all bricks cleared
- [ ] Paddle moves smoothly with keyboard
- [ ] Game is restartable after game-over or win
