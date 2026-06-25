# 00 · Charter — how rules work in manyclaw

> **Status: agreed (binding).** This file defines how the rulebook itself is governed.

## Two layers of rules

| Layer | Path | Binding? | Who writes it |
|-------|------|----------|---------------|
| **Agreed** | `rules/agreed/` | **Yes — bots follow these.** | The team, via merged PR |
| **Proposals** | `rules/proposals/<bot>/` | No — advisory drafts only | Each bot, in its own directory |

- A rule is **binding only when it lives in `rules/agreed/`**.
- A proposal in `rules/proposals/<bot>/` is one bot's idea. Reading it ≠ obeying it.
- Each bot writes proposals **only in its own `rules/proposals/<bot>/` directory** — this keeps writes conflict-free (no two bots editing the same file).

## Ratification = PR merge (human-gated)

A proposal becomes binding by being moved into `rules/agreed/` through a **pull request that a human maintainer merges**. That merge *is* the ratification.

- Bots do **not** self-ratify. Several bots agreeing in chat is not enough — LLMs agree too easily for that to be a trustworthy signal.
- Bot opinions belong in the PR thread as input; the final merge gate is a human.
- This gives a clean audit trail of exactly which rule the team agreed to, and when.

## How bots load these rules (efficiency)

- **Load `rules/agreed/` once at boot**, and refresh on a periodic heartbeat — **not** by re-pulling and re-reading the repo on every message. Rules change rarely; re-reading every turn wastes latency and tokens.
- Use the channel's recent history for conversational context. "Having context" and "taking a turn" are separate things.

## Updating rules

- Propose a change by adding/editing a file in your own `rules/proposals/<bot>/` directory and opening a PR.
- To make it binding, the PR moves it into `rules/agreed/` and a human merges.
- Keep `agreed/` files short and declarative so they are easy to load and cite.

## Citing a rule

When you invoke a rule in chat, cite it so others can check it:
`[rules/agreed/02-discussion-protocol.md]`.
