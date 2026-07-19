"""S4 · 대국+심판 — owner: Jake-bot.  Two strategies + match runner (integration hub).
Consumes S1 notation, S2 legal_moves (+order D2), S3 apply/outcome. Illegal-move handling = D3."""
import sys
from state import render, move_to_str, str_to_move
from contract import State, BLACK, WHITE, EMPTY

PASS = None


def strategy_corner(state):
    """Prefer corners, then edges, then max-flips among remaining."""
    from movegen import legal_moves
    moves = legal_moves(state)
    if not moves:
        return None
    corners = [(0, 0), (0, 7), (7, 0), (7, 7)]
    corner_moves = [m for m in moves if m in corners]
    if corner_moves:
        return corner_moves[0]
    edges = []
    for r in range(8):
        for c in range(8):
            if (r in (0, 7) or c in (0, 7)) and (r, c) not in corners:
                edges.append((r, c))
    edge_moves = [m for m in moves if m in edges]
    if edge_moves:
        return edge_moves[0]
    return moves[0]


def strategy_mobility(state):
    """Choose the move that minimizes opponent's next legal-move count."""
    from movegen import legal_moves
    from rules import apply
    moves = legal_moves(state)
    if not moves:
        return None
    best_move = None
    best_count = 999
    for move in moves:
        next_state = apply(state, move)
        from movegen import legal_moves as lm
        opp_moves = lm(next_state)
        count = len(opp_moves)
        if count < best_count:
            best_count = count
            best_move = move
    return best_move


def run_match(player_a, player_b):
    """Run a game between two strategy functions. Return dict with winner/score/plies."""
    from state import initial_state
    from movegen import legal_moves
    from rules import apply, score, is_terminal

    state = initial_state()
    players = {BLACK: player_a, WHITE: player_b}
    plies = 0

    while True:
        if is_terminal(state):
            break
        player = players[state.to_move]
        moves = legal_moves(state)
        if not moves:
            move = None
        else:
            move = player(state)
            if move is not None and move not in moves:
                move = None
        print(f'Ply {plies}: {move_to_str(move) if move else "--"}')
        print(render(state))
        s = score(state)
        print(f'Score: B={s[0]} W={s[1]}')
        print()
        state = apply(state, move)
        plies += 1

    s = score(state)
    if s[0] > s[1]:
        winner = BLACK
    elif s[1] > s[0]:
        winner = WHITE
    else:
        winner = 0
    print(f'WINNER: {winner} ({s[0]}-{s[1]})')
    return {'winner': winner, 'score': s, 'plies': plies}


def main():
    """CLI: python play.py <A> <B> where A,B are strategy names (corner|mobility)."""
    if len(sys.argv) != 3:
        print('Usage: python play.py <playerA> <playerB>')
        print('  Strategies: corner, mobility')
        sys.exit(1)

    strat_name_a = sys.argv[1]
    strat_name_b = sys.argv[2]

    strategies = {'corner': strategy_corner, 'mobility': strategy_mobility}
    if strat_name_a not in strategies or strat_name_b not in strategies:
        print('Unknown strategy. Use: corner, mobility')
        sys.exit(1)

    player_a = strategies[strat_name_a]
    player_b = strategies[strat_name_b]

    result = run_match(player_a, player_b)
    print(f'Final: winner={result["winner"]} score={result["score"]} plies={result["plies"]}')


if __name__ == '__main__':
    main()
