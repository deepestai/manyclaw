// Test: game.js core logic
// Run: node test-game.mjs

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    console.log(`  ✓ ${msg}`);
    passed++;
  } else {
    console.log(`  ✗ ${msg}`);
    failed++;
  }
}

// --- Ball Physics ---

function createBall(x = 100, y = 100, vx = 3, vy = -3, radius = 8) {
  return { x, y, vx, vy, radius };
}

function moveBall(ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// Ball stays within canvas bounds (reflect vx on left/right, vy on top)
function reflectBall(ball, canvasWidth, canvasHeight) {
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

// Ball fell below paddle (lost)
function ballLost(ball, canvasHeight) {
  return ball.y - ball.radius > canvasHeight;
}

// --- Paddle ---

function createPaddle(x = 175, width = 60, height = 10, y = 350) {
  return { x, y, width, height };
}

function movePaddle(paddle, dx, canvasWidth) {
  paddle.x += dx;
  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x + paddle.width > canvasWidth) paddle.x = canvasWidth - paddle.width;
}

// --- Collision ---

// Ball vs Paddle (AABB)
function ballPaddleCollision(ball, paddle) {
  return (
    ball.x + ball.radius > paddle.x &&
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height
  );
}

// Ball vs Brick (AABB)
function ballBrickCollision(ball, brick) {
  return (
    ball.x + ball.radius > brick.x &&
    ball.x - ball.radius < brick.x + brick.width &&
    ball.y + ball.radius > brick.y &&
    ball.y - ball.radius < brick.y + brick.height
  );
}

// --- Tests ---

console.log('Ball physics:');
const b = createBall(100, 100, 3, -3, 8);
moveBall(b);
assert(b.x === 103 && b.y === 97, 'Ball moves in direction (103, 97)');

const b2 = createBall(2, 100, -3, 3, 8);
reflectBall(b2, 400, 400);
assert(b2.vx > 0, 'Left wall: vx becomes positive');
assert(b2.x === 8, 'Left wall: x clamped to radius');

const b3 = createBall(398, 100, 3, 3, 8);
reflectBall(b3, 400, 400);
assert(b3.vx < 0, 'Right wall: vx becomes negative');
assert(b3.x === 392, 'Right wall: x clamped');

const b4 = createBall(100, 2, 3, -3, 8);
reflectBall(b4, 400, 400);
assert(b4.vy > 0, 'Top wall: vy becomes positive');

const b5 = createBall(100, 100, 3, -3, 8);
assert(!ballLost(b5, 400), 'Ball above bottom: not lost');
b5.y = 410;
assert(ballLost(b5, 400), 'Ball below bottom: lost');

console.log('\nPaddle:');
const p = createPaddle(100, 60, 10, 350);
movePaddle(p, 20, 400);
assert(p.x === 120, 'Paddle moves right 20px');
movePaddle(p, -200, 400);
assert(p.x === 0, 'Paddle clamped at left edge');

console.log('\nCollision:');
// Ball bottom (y+radius) must overlap paddle top (y) to hit
const ball = createBall(150, 345, 0, 3, 8); // y=345, bottom=353, paddle top=350
const paddle = createPaddle(140, 60, 10, 350);
assert(ballPaddleCollision(ball, paddle), 'Ball hits paddle — collision detected');

const brick = { x: 140, y: 320, width: 60, height: 20 };
const ball2 = createBall(150, 330, 0, -3, 8);
assert(ballBrickCollision(ball2, brick), 'Ball hits brick — collision detected');

const ball3 = createBall(150, 400, 0, -3, 8);
assert(!ballBrickCollision(ball3, brick), 'Ball below brick — no collision');

// --- Summary ---
console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
