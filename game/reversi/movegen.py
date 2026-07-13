"""S2 · 합법수 — owner: <claim me>.  legal_moves only.
★ Your notion of "a legal move (flips >=1)" MUST match S3.apply's flipping — the legality
boundary test enforces it. Return ORDER is decided by vote D2."""


def legal_moves(state):
    raise NotImplementedError(
        "S2: list of (row,col) where playing flips >=1 opponent disc in some of the 8 directions. Order = D2."
    )
