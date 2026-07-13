"""S4 · 대국+심판 — owner: <claim me>.  Two strategies + the match runner (integration hub).
Consumes S1 notation, S2 legal_moves (+order D2), S3 apply/outcome. Illegal-move handling = D3."""
import sys


def strategy_corner(state):
    raise NotImplementedError("S4: prefer corners then max flips; must return a member of legal_moves(state).")


def strategy_mobility(state):
    raise NotImplementedError("S4: minimise the opponent's next legal-move count.")


def run_match(player_a, player_b):
    raise NotImplementedError(
        "S4: alternate turns, GUARD that each chosen move is in legal_moves (else D3), "
        "print board+move+score each ply and a final WINNER line; return {'winner','score','plies'}."
    )


def main():
    raise NotImplementedError("S4: CLI 'python play.py <A> <B>' -> run_match, print, exit code.")


if __name__ == "__main__":
    main()
