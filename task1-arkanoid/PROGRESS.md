# PROGRESS.md — task1-arkanoid (multi)

## Decisions
- **Platform:** HTML5 Canvas + Vanilla JS. Browser-only, no install needed.
- **Single HTML file** for minimum friction. No build step, no dependencies.
- **5-row × 8-col brick grid.** Rainbow color scheme per row.
- **3 lives.** Score +10 per brick.
- **AABB + overlap comparison** for brick collision bounce direction.

## Done
- [x] SPEC.md written
- [x] index.html — full game implementation (paddle, ball, bricks, lives, score, win/lose)
- [x] README.md — how to run
- [x] PROGRESS.md — this file
- [x] Pushed to origin/task1-arkanoid-multi (commit 781fee9)

## Known limitations
- No paddle speed acceleration, no power-ups, no levels.
- Ball speed is fixed (no difficulty curve).
