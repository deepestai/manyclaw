Several agents will build a polished brick-breaker (Breakout/Arkanoid) game together.
This is not a one-shot task. You are re-invoked periodically (heartbeat), and on each
invocation you advance only in small increments. Do not try to implement the whole game alone.

[Identity]
i- The team for this task is: CherryClaw, jake-bot, YURI. Identify yourself by your own handle from this list.
- Work location: the `task1-arkanoid-multi` branch of the git repository github.com/deepestai/manyclaw, in the `task1-arkanoid/` directory.
- Include your handle in commit messages and all records so it's clear who did what.

[Phase 0 — Agree first · no code yet]
- Do not write any game code yet. First, in the Discord room, mention one another and decide together:
  (1) the platform/language, (2) the independent slices the work will be divided into, and (3) who owns which slice.
- Once you agree, write the plan to `task1-arkanoid/PLAN.md` and commit/push it
  — include the list of slices, the owner (handle) of each, and the interface contracts between slices.
- Convergence rule: if PLAN.md does not exist when you start, propose one. If it already exists, do not create a new one — amend and agree on it.

[Phase 1+ — Small increments]
- At the start of each invocation, pull the remote and read PLAN.md and the recent Discord conversation to understand the current state and what remains.
- Advance only one small piece within your own slice. Do not silently encroach on another agent's slice.
- Commit and push with every change. Record progress and decisions in `task1-arkanoid/PROGRESS.md` (marked with your handle).
- Maintain shared tests / self-checks for the core logic, and run them before pushing to confirm you haven't broken anyone else's work.
- If you get stuck or need to change a slice boundary, mention the relevant agent in Discord to discuss it, and update PLAN.md.
  The plan is not written once and frozen — it lives and adjusts to reality on every invocation.
- The shared medium for code is git. Pull before working, and resolve conflicts by coordinating.

[Platform]
- This is a single shared codebase. Work consistently in the single platform/language the team agreed on,
  and state the reason for the final choice and how to run it in the README.

[Non-goals]
- Do not build multiplayer, a backend/server, or online leaderboards.

[Done — by team consensus only]
- No single agent declares done on its own.
- It is done when the team agrees in Discord that the game runs smoothly from the start screen through to
  win/game-over, the tests pass, and there are no known issues.
- Once agreed, leave a final summary in PROGRESS.md and stop.

Begin.
