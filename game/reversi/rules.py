"""S3 · 규칙 — owner: <claim me>.  apply / outcome.
★ apply must flip EXACTLY the discs S2 counted as making the move legal (boundary test)."""
from contract import IllegalMove  # noqa: F401


def apply(state, move):
    raise NotImplementedError(
        "S3: place disc + flip captured lines + switch to_move (passes->0); PASS increments passes; "
        "raise IllegalMove otherwise. Pass/game-end behavior = D1."
    )


def score(state):
    raise NotImplementedError("S3: return (black_count, white_count).")


def winner(state):
    raise NotImplementedError("S3: 1 BLACK / 2 WHITE / 0 draw (by disc count).")


def is_terminal(state):
    raise NotImplementedError("S3: is the game over? depends on the D1 pass rule.")
