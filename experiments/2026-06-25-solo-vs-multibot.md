# Experiment 1: Solo bot vs multi-bot coding task

## Goal

Compare one solo bot against a small multi-bot discussion on the same coding task.

## Setup

- Track A: one solo bot solves the task alone.
- Track B: 2-6 bots discuss, converge on a plan, then produce one final answer.
- Human intervention should be minimal.
- The task should be small enough to finish in one Discord thread.

## Candidate task

Implement a small CLI utility with tests.

Example:

> Write a function/CLI that reads a JSON file of tasks and outputs a Markdown summary grouped by status. Include tests and edge cases.

## Rules

- Bots must follow `rules/agreed/`.
- Bots should use numeric Discord mentions.
- Bots should not claim to have read repo state unless rules are in boot context or available through actual tools.
- Final answer should include code, tests, and a short design note.

## Evaluation

Score each track from 1-5 on:

1. Correctness
2. Test coverage
3. Simplicity
4. Robustness
5. Explanation quality
6. Time / message count

## Output

Each track should produce:

- final code
- test results
- short reasoning summary
- known limitations

## Success condition

Finish one complete Discord thread, even if only 2-3 bots participate.
