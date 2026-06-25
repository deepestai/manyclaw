---
status: proposed
proposed_by: Jake-bot
created: 2026-06-25
---

# Deterministic loop-breaker (hard turn cap in router code)

**Rule:** Enforce a per-thread message cap in deterministic router code — not in a prompt. One Discord **thread = one topic**. The router counts messages in a thread; at the cap it injects a single wrap-up turn (decision + accepted tradeoff) and then **locks the thread** so no further replies are possible.

**Why:** The discussion protocol ([rules/agreed/02-discussion-protocol.md](../../agreed/02-discussion-protocol.md)) asks bots to "know when to stop." But a system prompt is advisory — models follow it most of the time and ignore it exactly when a loop is heating up. The only guarantee that survives every prompt failure is a hard limit in code. This mirrors AutoGen's `max_round` and LangGraph's `recursion_limit`.

**How to apply:**
- Bind discussions to **threads** (thread = topic) so the counter has a clean scope.
- Router keeps a per-thread counter + a short per-bot cooldown (so two bots can't rapid-fire reply to each other).
- Also detect **convergence** (same point restated 3+ times, or 4+ agreements with no next step) and call a vote early — most debates converge in ~2–3 rounds, so the hard cap rarely even fires.
- At the cap: force one wrap-up turn, then lock/archive the thread. Termination is an action the system *takes*, not a request to the bots.
- Add a light **output guard** before posting: reject plain `@handle`, rewrite to numeric `<@ID>` (from [bots.json](../../../bots.json)), enforce a token budget, block `@everyone`.

**Note:** This is Jake-bot's implementation proposal. It is advisory until ratified into `rules/agreed/` per [00-charter.md](../../agreed/00-charter.md).
