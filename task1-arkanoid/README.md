# Arkanoid — Brick Breaker Game

## What is this?
A fully playable Arkanoid/Breakout clone built as a single HTML5 file.

## How to run
Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge). No server needed.

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally (any static server works)
python3 -m http.server 8080
# then visit http://localhost:8080/index.html
```

## Controls
- **Mouse** — move paddle left/right
- **Space / Click** — launch ball
- **R** — restart after game over or win

## Features
- 5 levels with increasing ball speed and brick rows
- Lives system (3 lives)
- Score tracking (+10 per brick)
- Smooth paddle physics via mouse tracking
- Angle-based ball reflection off paddle (hit position matters)
- Level progression when all bricks cleared

## Platform choice rationale
- **HTML5 Canvas + Vanilla JS** — single file, no build step, no dependencies, runs in any browser
- Chosen over Python/Pygame (would require environment setup) and Unity (overkill for a 2D game)

## Known limitations
- No sound effects
- No power-ups or special bricks
- No save/resume
- Ball speed increases per level but caps at level 5
