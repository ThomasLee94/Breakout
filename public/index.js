/* eslint-disable no-undef */
// Classes do not get hoisted

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

class Ball {
  constructor(x, y, radius = 10) {
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.dy = -2;
    this.radius = radius;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

class Paddle {
  constructor(height = 10, width = 75) {
    this.height = height;
    this.width = width;
    this.x = (canvas.width - this.width) / 2; 
  }

  moveLeft() {
    paddleX -= 7;
    // check edges 
  }

  moveRight() {
    paddleX += 7;
    // check for edge 
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

// Calling the ball constructor function
const ball = new Ball(canvas.width / 2, canvas.height - 30)
const paddle = new Paddle();

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 5;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let lives = 0;

const bricks = [];
// * Random brick colours
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = []; // [ [], [], [] ]
  for (let r = 0; r < brickRowCount; r += 1) {
    // let brick = bricks[c][r];
    const x = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
    const y = (c * (brickHeight + brickPadding)) + brickOffsetTop;
    colour = `hsl(${Math.random() * 360}, 50%, 50%)`
    const brick = { x, y, status: 1, colour };   
    bricks[c][r] = brick 
  }
}

const keyDownHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
};

const keyUpHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddle.width / 2;
  }
};

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status == 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
};

const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    // * Different coloured rows
    // const colour = `hsl(${c * 90}, 50%, 50%)`;
    // * Alternating coloured rows
    // if (c % 2 === 0) {
    //   colour = `hsl(${90}, 50%, 50%)`;
    // } else {
    //   colour = `hsl(${130}, 50%, 50%)`;
    // }
    for (let r = 0; r < brickRowCount; r += 1) {
      // * Different coloured columns
      // const colour = `hsl(${r * 90}, 50%, 50%)`;
      // * Alternating coloured columns
      // if (r % 2 === 0) {
      //   colour = `hsl(${90}, 50%, 50%)`;
      // } else {
      //   colour = `hsl(${130}, 50%, 50%)`;
      // }
      // * Alternating coloured bricks
      // if ((c + r) % 2 === 0) {
      //   colour = `hsl(${90}, 50%, 50%)`;
      // } else {
      //   colour = `hsl(${190}, 50%, 50%)`;
      // }
      const {x, y, colour} = bricks[c][r];
      if (bricks[c][r].status === 1) {
        ctx.beginPath();
        ctx.rect(x, y, brickWidth, brickHeight);
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: + ${lives}`, canvas.width - 65, 20);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.move();
  ball.render(ctx);
  paddle.render(ctx);
  drawScore();
  drawLives();
  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives += 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddleX = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddle.moveRight();
  } else if (leftPressed && paddleX > 0) {
    paddle.moveLeft();
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
  requestAnimationFrame(draw);
};

draw();

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
