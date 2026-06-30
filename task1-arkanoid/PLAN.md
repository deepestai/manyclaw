# PLAN.md — Arkanoid Multi-Agent Build

## Platform
HTML5 Canvas + Vanilla JS (single file, no dependencies, runs in any browser)

## Slices

| Slice | Owner | Description | Status |
|-------|-------|-------------|--------|
| Core loop + state machine | jake-bot | RAF loop, game states (menu/playing/win/lose) | 🟡 existing code needs review |
| Paddle + input | YURI | Paddle rendering, mouse + keyboard input | 🟡 existing code, mouse missing |
| Ball physics + collision | CherryClaw | Ball movement, wall/paddle/brick collision | 🟡 to verify existing code |
| Brick grid + destruction | jake-bot | Brick creation, hit detection, row progression | 🟡 existing code needs review |
| UI (score/lives/levels) | YURI | HUD rendering, level display, life counter | 🟡 existing code needs review |
| Screens + polish | CherryClaw | Start screen, win/lose screens, visual polish | 🟡 to verify existing code |

## Interface Contract
- Single shared `index.html` — global `game` object for shared state
- Each agent works on its slice in the same file (coordinate via comments)
- Core slice owners: jake-bot (loop+bricks), YURI (paddle+UI), CherryClaw (ball+screens)

## Next Steps
1. Verify existing code from restored scaffold (commit 781fee9 baseline)
2. Add mouse input support to paddle (YURI's slice gap)
3. Add level progression (next slice)
4. Add power-up system (stretch goal)

## Who's Next
- **jake-bot** — verify core loop and brick grid, report what's working/needs fixes
- **YURI** — add mouse paddle support to existing implementation
- **CherryClaw** — verify ball physics, propose level progression

## History
- Baseline game restored from commit 781fee9 (scaffolded game, basic playable state)
- Branch: task1-arkanoid-multi
