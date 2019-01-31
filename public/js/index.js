/* eslint-disable class-methods-use-this */
// IMPORTS
import { Ball } from 'ball.js';
import { Paddle } from 'paddle.js';
import { Brick } from 'brick.js';
import { Bricks } from 'bricks.js';
import { Score } from 'score.js';
import { Lives } from 'lives.js';

// GLOBAL VARIABLES
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// CALLING CONSTRUCTORS FROM IMPORTS TO INSTANTIATE OBJECTS 
const ball = new Ball(canvas.width / 2, canvas.height - 30)
const paddle = new Paddle();
const brick = new Brick();
const bricks = new Bricks();
const score = new Score();
const lives = new Lives();

let rightPressed = false;
let leftPressed = false;

// =====================================================================
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

// KEYEVENT LISTENERS

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// FUNCTIONS

const collisionDetection = () => {
  for (let c = 0; c < bricks.columnNum; c += 1) {
    for (let r = 0; r < bricks.rowNum; r += 1) {
      const b = bricks[c][r];
      if (b.status == 1) {
        if (ball.x > b.x && ball.x < b.x + brick.width && ball.y > b.y && ball.y < b.y + brick.height) {
          ball.dy = -ball.dy;
          b.status = 0;
          score += 1;
          if (score === bricks.rowNum * bricks.columnNum) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
};

class Game {
  constructor() {
    this.ball = ball
    this.paddle = paddle
    this.bricks = bricks
    this.score = score
    this.lives = lives
  }

  run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bricks.render();
    ball.move();
    ball.render(ctx);
    paddle.render(ctx);
    score.render(ctx);
    lives.render(ctx);
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
  }
}
  
const game = new Game();
game.run();
