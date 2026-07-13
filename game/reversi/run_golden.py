#!/usr/bin/env python3
"""FROZEN judge — do NOT edit. Runs the golden game + boundary tests against the seam
implementations (state.py / movegen.py / rules.py) and prints PASS/FAIL.
Task B success = this prints ALL GREEN.  Run:  cd game/reversi && python run_golden.py"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

results = []


def check(name, fn):
    try:
        fn()
        results.append((name, True, ""))
    except NotImplementedError as e:
        results.append((name, False, f"not implemented: {e}"))
    except AssertionError as e:
        results.append((name, False, f"FAIL: {e}"))
    except Exception as e:  # noqa: BLE001
        results.append((name, False, f"error: {type(e).__name__}: {e}"))


def golden_game():
    import state
    import movegen
    import rules
    gdir = os.path.join(HERE, "tests", "golden")
    moves = open(os.path.join(gdir, "game_01.moves")).read().split()
    exp = {}
    for line in open(os.path.join(gdir, "game_01.expected")):
        line = line.strip()
        if line:
            k, v = line.split("=", 1)
            exp[k] = v
    st = state.initial_state()
    for tok in moves:
        m = state.str_to_move(tok)
        assert m in movegen.legal_moves(st), f"'{tok}' not legal per movegen (S2<->S3 disagree?)"
        st = rules.apply(st, m)
    ser = state.serialize(st)
    assert ser == exp["serialize"], f"serialize mismatch\n want: {exp['serialize']}\n got : {ser}"
    b, w = rules.score(st)
    assert f"{b}-{w}" == exp["score"], f"score want {exp['score']} got {b}-{w}"
    assert str(rules.winner(st)) == exp["winner"], f"winner want {exp['winner']} got {rules.winner(st)}"


def boundary_legality():
    """S2<->S3: every move S2 calls legal must actually flip >=1 in S3.apply; an illegal cell must raise."""
    import state
    import movegen
    import rules
    from contract import IllegalMove
    st = state.initial_state()
    lm = movegen.legal_moves(st)
    assert len(lm) == 4, f"initial legal-move count want 4 got {len(lm)}  (S2 movegen wrong)"
    b0, w0 = rules.score(st)
    for m in lm:
        st2 = rules.apply(st, m)
        b1, w1 = rules.score(st2)
        gained = (b1 - b0) if st.to_move == 1 else (w1 - w0)
        assert gained >= 2, f"legal move {m} flipped nothing (S2 says legal, S3 didn't flip) -> OWNERS S2 & S3"
    raised = False
    try:
        rules.apply(st, (0, 0))  # a1 is never legal at the start
    except IllegalMove:
        raised = True
    assert raised, "apply on an illegal move must raise IllegalMove"


def boundary_notation():
    """S1: str_to_move / move_to_str must round-trip for every cell + PASS."""
    import state
    from contract import PASS
    for r in range(8):
        for c in range(8):
            got = state.str_to_move(state.move_to_str((r, c)))
            assert got == (r, c), f"notation round-trip failed at {(r, c)} -> got {got}"
    assert state.str_to_move(state.move_to_str(PASS)) == PASS, "PASS round-trip failed"


check("golden 01 · scripted game (S1·S2·S3 통합)", golden_game)
check("boundary  · legality  (S2<->S3 뒤집기 일치)", boundary_legality)
check("boundary  · notation  (S1 표기 왕복)", boundary_notation)

passed = sum(1 for _, ok, _ in results if ok)
for name, ok, msg in results:
    print(f"[{'PASS' if ok else 'FAIL'}] {name}" + (f"  — {msg}" if msg else ""))
if passed == len(results):
    print(f"ALL GREEN ({passed}/{len(results)})")
    sys.exit(0)
print(f"RED ({passed}/{len(results)} passed)")
sys.exit(1)
