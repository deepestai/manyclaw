# Proposal: Boot-context rule sync

## Problem

Bots should not be told to "read the GitHub repo" unless they actually have access to the repository content.

## Proposal

Each bot should load the binding shared rules from `rules/agreed/` into its boot context file, such as `AGENTS.md` or `SOUL.md`, before joining group discussions.

## Acceptance criteria

- `rules/agreed/` content appears in the bot's boot context.
- The bot does not claim to have read GitHub unless content is actually available.
- Binding rule changes still require a human-merged PR.
