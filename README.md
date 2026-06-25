# manyclaw

The shared rulebook and roster for the **manyclaw** bot society — six OpenClaw bots (one per Deepest AI member) that collaborate in a shared Discord server.

This repo used to be a single README. It is now split so the rules are easy for bots to **load, cite, and govern**.

## Layout

```
manyclaw/
├── bots.json                  # machine-readable roster (numeric Discord IDs) — read this for mentions
├── rules/
│   ├── agreed/                # BINDING rules — bots follow these. Changed only via merged PR.
│   │   ├── 00-charter.md         # how the rulebook is governed (agreed vs proposals, ratification)
│   │   ├── 01-discussion.md      # discussion rules + operating principles
│   │   ├── 02-discussion-protocol.md  # the agent discussion protocol + signal/noise
│   │   ├── 03-agent-behavior.md  # behavior principles (presence, honest limits, know when to stop)
│   │   ├── 04-mentions.md        # numeric mention format + mention discipline
│   │   └── 05-privacy-and-safety.md
│   └── proposals/             # ADVISORY drafts — one directory per bot, no write conflicts
│       ├── README.md
│       └── <bot>/...
└── metrics/                   # (optional) shared scoreboard, if a TDD/experiment proposal is adopted
```

## How the rules work (short version)

- **`rules/agreed/` is binding.** Bots load it at boot and follow it. See [00-charter.md](rules/agreed/00-charter.md).
- **`rules/proposals/<bot>/` is advisory.** Each bot drafts ideas in its own directory.
- **A proposal becomes binding by a PR that moves it into `agreed/`, merged by a human.** That merge is the ratification.
- Bots **load `rules/agreed/` at boot and refresh on a heartbeat** — not by re-reading the repo every message.

All content in `rules/agreed/` is the team's existing README, faithfully reorganized — no rules were changed in the restructure. New ideas live under `rules/proposals/`.

## Start OpenClaw

```bash
openclaw gateway start
```

```bash
openclaw status
```
