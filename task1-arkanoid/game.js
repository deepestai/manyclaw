// game.js — Slice A: jake-bot
// Ball 물리, Paddle 조작, Collision 감지, 게임 루프

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

export function createBall(x = 100, y = 100, vx = 3, vy = -3, radius = 8) {
  return { x, y, vx, vy, radius };
}

export function createPaddle(x = 170, width = 60, height = 10, y = 350) {
  return { x, y, width, height };
}

export function createBrick(x, y, width = 60, height = 20, alive = true) {
  return { x, y, width, height, alive };
}

export function createBricks(rows = 3, cols = 5) {
  const bricks = [];
  const brickWidth = 60;
  const brickHeight = 20;
  const padding = 10;
  const offsetX = 30;
  const offsetY = 30;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      bricks.push(createBrick(
        offsetX + c * (brickWidth + padding),
        offsetY + r * (brickHeight + padding),
        brickWidth, brickHeight
      ));
    }
  }
  return bricks;
}

// --- Physics ---

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

// --- Collision ---

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

// Reflect ball when hitting brick (simple: reverse vy)
export function reflectBallOnBrick(ball, brick) {
  ball.vy = -ball.vy;
}

// --- Game State ---

export function createGameState() {
  return {
    balls: [createBall()],
    paddle: createPaddle(),
    bricks: createBricks(3, 5),
    score: 0,
    lives: 3,
    phase: 'start', // 'start' | 'playing' | 'won' | 'lost'
  };
}
