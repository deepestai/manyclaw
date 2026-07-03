// renderer.js — Slice C: YURI
// Canvas 그리기 (read-only), HUD, Start/Game Over 오버레이

// Row colors for brick rendering
const ROW_COLORS = ['#ff3344', '#ff8800', '#ffee00', '#33ff66', '#3399ff'];

// Compute row index from brick y-position
function getRowIndex(brick, offsetY, brickHeight, padding) {
  return Math.round((brick.y - offsetY) / (brickHeight + padding));
}

export function render(ctx, gameState) {
  const { balls, paddle, bricks, score, lives, phase } = gameState;
  const { width, height } = ctx.canvas;

  ctx.clearRect(0, 0, width, height);

  drawBricks(ctx, bricks, width);
  drawPaddle(ctx, paddle);
  drawBalls(ctx, balls);
  drawHUD(ctx, score, lives, width);
  drawOverlay(ctx, phase, width, height);
}

function drawBricks(ctx, bricks, canvasWidth) {
  const brickHeight = 20;
  const padding = 10;
  const offsetY = 30;

  for (const brick of bricks) {
    if (!brick.alive) continue;

    const row = getRowIndex(brick, offsetY, brickHeight, padding);
    const color = ROW_COLORS[row % ROW_COLORS.length];

    ctx.fillStyle = color;
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);

    // Top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(brick.x, brick.y, brick.width, 4);

    // Right/bottom shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(brick.x, brick.y + brick.height - 2, brick.width, 2);
    ctx.fillRect(brick.x + brick.width - 2, brick.y, 2, brick.height);
  }
}

function drawPaddle(ctx, paddle) {
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath();
  ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 4);
  ctx.fill();

  // Top shine
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillRect(paddle.x + 4, paddle.y + 2, paddle.width - 8, 3);
}

function drawBalls(ctx, balls) {
  for (const ball of balls) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
}

function drawHUD(ctx, score, lives, canvasWidth) {
  ctx.fillStyle = '#bbbbbb';
  ctx.font = 'bold 14px Courier New, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`SCORE: ${score}`, 10, 18);
  ctx.textAlign = 'right';
  ctx.fillText(`LIVES: ${lives}`, canvasWidth - 10, 18);
}

function drawOverlay(ctx, phase, canvasWidth, canvasHeight) {
  if (phase === 'start') {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px Courier New, monospace';
    ctx.fillText('ARKANOID', canvasWidth / 2, canvasHeight / 2 - 20);

    ctx.font = '13px Courier New, monospace';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Press SPACE to start', canvasWidth / 2, canvasHeight / 2 + 12);
    return;
  }

  if (phase === 'won') {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#33ff66';
    ctx.textAlign = 'center';
    ctx.font = 'bold 28px Courier New, monospace';
    ctx.fillText('YOU WIN!', canvasWidth / 2, canvasHeight / 2 - 12);

    ctx.font = '13px Courier New, monospace';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Press R to restart', canvasWidth / 2, canvasHeight / 2 + 20);
    return;
  }

  if (phase === 'lost') {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#ff4444';
    ctx.textAlign = 'center';
    ctx.font = 'bold 28px Courier New, monospace';
    ctx.fillText('GAME OVER', canvasWidth / 2, canvasHeight / 2 - 12);

    ctx.font = '13px Courier New, monospace';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Press R to restart', canvasWidth / 2, canvasHeight / 2 + 20);
  }
}
