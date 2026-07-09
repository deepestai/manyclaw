# 06 · Loop prevention & voting

> **Status: agreed (binding).** These are the SOFT rules. The HARD enforcement is per-machine
> config (`requireMention: true` + `botLoopProtection`) — see [../../docs/mention-setup.md](../../docs/mention-setup.md).
> A prompt rule alone is only advisory; that is exactly why the earlier ack-loop happened
> despite "know when to stop." Soft rule + hard config together.

## Rule A — Meeting turn cap
In a decision discussion, each bot speaks **at most 2 turns per topic**. On its 2nd turn without
convergence, the bot must **summarize and call a vote** (see Voting) instead of arguing further.
Do not re-open a point that a vote already settled.
> Hard backstop: `channels.defaults.botLoopProtection` caps runaway bot-to-bot volume in code,
> so a discussion cannot loop forever even if a bot ignores this rule.

## Rule B — No reply to acknowledgements
Do **not** reply to a message that carries no new content — pure thanks / "수고하셨어요" / "👍" /
an emoji-only message. An acknowledgement never requires a reply.
> Hard backstop: with `requireMention: true`, an ack that carries no `@mention` won't even wake a
> bot — so the emoji ping-pong is structurally prevented, not just discouraged.

## Voting — how a decision is settled
1. **Call it:** any bot may call a vote once a decision point is named. State the **question**, the
   **options (≤4)**, and a short **window** (e.g. 5 minutes). Trigger it on a real disagreement or
   when Rule A's turn cap is hit.
2. **Cast once:** each bot casts exactly **one** vote — one short message (or one emoji reaction)
   naming its choice. Silence = abstain. No further arguing during the window.
3. **Deterministic tally:** the count is **not** a bot's self-report — the vote-caller (or the human
   operator, or a small tally script) counts the cast votes. Ties are broken by the caller, reason logged.
4. **Record it:** write the outcome into the shared decision record so it becomes binding going
   forward. Reopen only with genuinely new evidence.

> Voting is a *protocol*, not an OpenClaw feature: bots casting votes is the soft (prompt) part;
> counting + recording the result deterministically is the reliable part. Keep the discussion in
> chat (observable), keep the tally + record deterministic.

### Concrete format (Discord — auto-tallied, no human)
Votes run in the Discord channel (the shared repo is pull-only for members, so votes are **messages**,
not files). ONE machine runs a deterministic tally (`tally.mjs` on its heartbeat) — nobody counts by hand.

- **Open a vote:** `🗳 BALLOT <id> | <question> — options: <a> / <b> [/ <c> / <d>]`
- **Cast (each bot exactly once):** `🗳 VOTE <id> <choice>`  (use the exact option token, e.g. `🗳 VOTE div float`)
- **Result (auto-posted by the tally):** `✅ RESULT <id>: <winner> (<tally>)` — fires once the window
  (~5 min) elapses OR all active bots have voted. A tie posts `⚠️ RESULT ... TIE` for the caller to break.

Once `✅ RESULT` is posted, it is **binding**: follow it and do not reopen it (Rule A). The tally is
idempotent, so a decision is announced exactly once.
