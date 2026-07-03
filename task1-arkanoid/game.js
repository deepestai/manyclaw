// game.js — Slice A: jake-bot
// Integration: game loop, input, collision, score/lives/phase, bricks.js + renderer.js

import { createBricksForLevel, markBrickDead, checkWinCondition } from './bricks.js';
import { render } from './renderer.js';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const PADDLE_SPEED = 8;
const BALL_SPEED = 4;

// --- Exports for external use ---

export function createBall(x = 100, y = 100, vx = 3, vy = -3, radius = 8) {
  return { x, y, vx, vy, radius };
}

export function createPaddle(x = 170, width = 60, height = 10, y = 350) {
  return { x, y, width, height };
}

export function createBrick(x, y, width = 60, height = 20, alive = true) {
  return { x, y, width, height, alive };
}

export function moveBall(ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;
}

export function reflectBall(ball, canvasWidth, canvasHeight) {
  if (ball.x - ball.radius <= 0) {
    ball.x = ball.radius;
    ball.vx = Math.abs(ball.vx);
  }
  if (ball.x + ball.radius >= canvasWidth) {
    ball.x = canvasWidth - ball.radius;
    ball.vx = -Math.abs(ball.vx);
  }
  if (ball.y - ball.radius <= 0) {
    ball.y = ball.radius;
    ball.vy = Math.abs(ball.vy);
  }
}

export function ballLost(ball, canvasHeight) {
  return ball.y - ball.radius > canvasHeight;
}

export function movePaddle(paddle, dx, canvasWidth) {
  paddle.x += dx;
  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x + paddle.width > canvasWidth) paddle.x = canvasWidth - paddle.width;
}

export function ballPaddleCollision(ball, paddle) {
  return (
    ball.x + ball.radius > paddle.x &&
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height
  );
}

export function ballBrickCollision(ball, brick) {
  if (!brick.alive) return false;
  return (
    ball.x + ball.radius > brick.x &&
    ball.x - ball.radius < brick.x + brick.width &&
    ball.y + ball.radius > brick.y &&
    ball.y - ball.radius < brick.y + brick.height
  );
}

export function reflectBallOnBrick(ball, brick) {
  ball.vy = -ball.vy;
}

// --- Game State Factory ---

export function createGameState(levelIndex = 0) {
  return {
    balls: [createBall()],
    paddle: createPaddle(),
    bricks: createBricksForLevel(levelIndex),
    score: 0,
    lives: 3,
    phase: 'start', // 'start' | 'playing' | 'won' | 'lost'
    level: levelIndex,
  };
}

// --- Game Loop Variables ---

let keys = {};
let gameState = null;
let animationId = null;

// --- Input Handling ---

function setupInput(canvas) {
  window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (gameState && gameState.phase === 'start') {
      gameState.phase = 'playing';
    }
  });
  window.addEventListener('keyup', e => {
    keys[e.key] = false;
  });
}

// --- Core Loop ---

function resetBall() {
  gameState.balls = [createBall()];
}

function loseLife() {
  gameState.lives -= 1;
  if (gameState.lives <= 0) {
    gameState.phase = 'lost';
  } else {
    resetBall();
  }
}

function step() {
  if (gameState.phase !== 'playing') return;

  const { balls, paddle, bricks } = gameState;

  // Input
  if (keys['ArrowLeft'] || keys['a']) movePaddle(paddle, -PADDLE_SPEED, CANVAS_WIDTH);
  if (keys['ArrowRight'] || keys['d']) movePaddle(paddle, PADDLE_SPEED, CANVAS_WIDTH);

  // Ball movement
  for (const ball of balls) {
    moveBall(ball);
    reflectBall(ball, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Paddle collision
    if (ballPaddleCollision(ball, paddle)) {
      ball.vy = -Math.abs(ball.vy);
      ball.y = paddle.y - ball.radius;
    }

    // Brick collision
    for (const brick of bricks) {
      if (ballBrickCollision(ball, brick)) {
        reflectBallOnBrick(ball, brick);
        markBrickDead(bricks, brick);
        gameState.score += 10;
        break;
      }
    }

    // Ball lost
    if (ballLost(ball, CANVAS_HEIGHT)) {
      loseLife();
      return;
    }
  }

  // Win check
  if (checkWinCondition(bricks)) {
    gameState.phase = 'won';
  }
}

// --- Main init ---

export function init(canvasId = 'game') {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  gameState = createGameState();
  setupInput(canvas);

  function loop() {
    step();
    render(ctx, gameState);
    if (gameState.phase !== 'lost') {
      animationId = requestAnimationFrame(loop);
    }
  }

  loop();
  return gameState;
}

// Auto-init on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => init());
}
