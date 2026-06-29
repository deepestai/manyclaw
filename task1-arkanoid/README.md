# Arkanoid — Brick Breaker

**Platform:** Single HTML file (HTML5 Canvas + Vanilla JavaScript)
**Why:** Runs in any modern browser, no installation or build step needed.

## How to Run
Open `index.html` directly in Chrome, Firefox, or Safari.

Or serve locally:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Controls
- **← / →** or **A / D**: move paddle
- **Space**: launch ball
- **Enter**: restart after game over or win

## Rules
- Clear all 40 bricks (8 cols × 5 rows) to win.
- You have 3 lives. Lose a life when the ball hits the bottom.
- Each brick = 10 points.

## Build Notes
- Single `index.html`, no dependencies, no build step.
- Game loop via `requestAnimationFrame`.
- Brick collision uses AABB + overlap comparison for accurate bounce direction.
