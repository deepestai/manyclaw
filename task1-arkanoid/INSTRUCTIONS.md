Several agents will build a polished brick-breaker (Breakout/Arkanoid) game together.
This is not a one-shot task. You wake up when the team mentions you; when you wake,
you advance only one small piece and then hand off to the next agent with a mention.
Do not try to implement the whole game alone.

[Identity]
- The team for this task is: CherryClaw, jake-bot, YURI. Identify yourself by your own handle from this list.
- Work location: the `task1-arkanoid-multi` branch of the git repository github.com/deepestai/manyclaw, in the `task1-arkanoid/` directory.
- Include your handle in commit messages and all records so it's clear who did what.

[Phase 0 — Agree first · no code yet]
- Do not write any game code yet. First, in the Discord room, mention one another and decide together:
  (1) the platform/language, (2) the independent slices the work will be divided into, and (3) who owns which slice.
- Once you agree, write the plan to `task1-arkanoid/PLAN.md` and commit/push it. Include:
  the list of slices, the owner (handle) of each, the interface contracts between slices,
  and a field for each slice's current status and "who's next".
- Convergence rule: if PLAN.md does not exist when you start, propose one. If it already exists, do not create a new one — amend and agree on it.

[Pacing — wake by mention, hand off by mention]
- You wake up when you are mentioned. On waking, first pull the remote and read PLAN.md and the recent Discord conversation to understand the current state and what you should do.
- If your slice has unfinished work, advance only one small piece of it. If it has none, say so briefly and stop (do not encroach on others' slices or duplicate work when you have nothing to do).
- When you finish a piece or get stuck: commit and push, update the slice status and "who's next" in PLAN.md, then mention the agent who should move next to hand off. If you need a decision, mention the relevant agent(s) to discuss.

[Tolerating dropped mentions — important]
- The mention system is not perfect. Make sure a single dropped mention does not kill the work.
- The source of truth for "what's next" is always PLAN.md, never a mention message. So even an agent who missed a mention can recover its turn later by waking, pulling, and reading PLAN.md. Keep PLAN.md current at all times.
- When handing off, don't mention only one agent — mention the relevant agents together. If you're stuck, it's fine to mention the whole team.
- So that redundant mentions don't cause several agents to grab the same piece, always check PLAN.md first on waking to confirm you actually have something to do.

[Verification]
- Maintain shared tests / self-checks for the core logic, and run them before pushing to confirm you haven't broken anyone else's work.

[Platform]
- This is a single shared codebase. Work consistently in the single platform/language the team agreed on, and state the reason for the final choice and how to run it in the README.

[Non-goals]
- Do not build multiplayer, a backend/server, or online leaderboards.

[Progress log]
- Record progress and decisions in `task1-arkanoid/PROGRESS.md` (marked with your handle).
  (PLAN.md = the living plan, slice status, and who's next; PROGRESS.md = the progress log.)

[Done — by team consensus only]
- No single agent declares done on its own. Do not mistake silence for completion.
- It is done when the team agrees in Discord that the game runs smoothly from the start screen through to win/game-over, the tests pass, and there are no known issues. Once agreed, leave a final summary in PROGRESS.md and stop.

Begin.
