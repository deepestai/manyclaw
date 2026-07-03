// bricks.js — Slice B: LobsterMan
// Brick 생성/관리, 레벨 데이터, 승리 판정

import { createBrick } from './game.js';

// --- Level Data ---

const LEVELS = [
  // Level 1: simple 3x5 grid
  { rows: 3, cols: 5, brickWidth: 60, brickHeight: 20, padding: 10, offsetX: 30, offsetY: 30 },
  // Level 2: 4x6 grid, slightly harder
  { rows: 4, cols: 6, brickWidth: 55, brickHeight: 18, padding: 8, offsetX: 20, offsetY: 30 },
  // Level 3: 5x7 grid
  { rows: 5, cols: 7, brickWidth: 48, brickHeight: 16, padding: 6, offsetX: 15, offsetY: 25 },
];

// --- Brick Array Management ---

export function createBricksForLevel(levelIndex) {
  const level = LEVELS[levelIndex] || LEVELS[0];
  const bricks = [];
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      bricks.push(createBrick(
        level.offsetX + c * (level.brickWidth + level.padding),
        level.offsetY + r * (level.brickHeight + level.padding),
        level.brickWidth,
        level.brickHeight,
        true // alive = true
      ));
    }
  }
  return bricks;
}

// Remove a brick by marking it dead
export function removeBrick(bricks, index) {
  if (index >= 0 && index < bricks.length) {
    bricks[index].alive = false;
  }
}

// Remove brick by finding it (used by collision detection)
export function markBrickDead(bricks, brick) {
  const idx = bricks.indexOf(brick);
  if (idx !== -1) {
    bricks[idx].alive = false;
  }
}

// --- Win/Lose Condition Checks ---

// Check if all bricks are dead (win condition)
export function checkWinCondition(bricks) {
  return bricks.every(brick => !brick.alive);
}

// Check if player won the game (all levels cleared)
export function checkGameWin(bricksCount) {
  return bricksCount === 0;
}
