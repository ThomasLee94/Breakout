/* eslint-disable class-methods-use-this */
// CLASSES IMPORTED FROM SCRIPTS IN HTML

// CALLING CONSTRUCTORS FROM IMPORTS TO INSTANTIATE OBJECTS 
const ball = new Ball(canvas.width / 2, canvas.height - 30);
const paddle = new Paddle();
const bricks = new Bricks();
bricks.create();
let paddleX = (canvas.width - paddle.width) / 2;
let x = canvas.width / 2;
let score = new Score();
let lives = new Lives();

class Game {
  constructor(ball, paddle, bricks, score, lives) {
    this.ball = ball;
    this.paddle = paddle;
    this.bricks = bricks; 
    this.score = score;
    this.lives = lives; 
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.rightPressed = false;
    this.leftPressed = false;
  }

  collisonDetection() {
    for (let c = 0; c < this.bricks.columnNum; c += 1) {
      for (let r = 0; r < this.bricks.rowNum; r += 1) {
        console.log(this.bricks.bricksArr)
        const brick = this.bricks.bricksArr[c][r];
        if (brick.status === 1) {
          if (ball.x > brick.x && ball.x < brick.x + brick.width && ball.y > brick.y && ball.y < brick.y + brick.height) {
            ball.dy = -ball.dy;
            brick.status = 0;
            score += 1;
            if (score === this.bricks.rowNum * this.bricks.columnNum) {
              alert('YOU WIN, CONGRATS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  run() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.render(ctx);
    this.ball.move();
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.score.render(ctx);
    this.lives.render(ctx);
    this.collisonDetection();
  
    if (ball.x + ball.dx > this.canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > this.canvas.height - ball.radius) {
      if (ball.x > paddle.x && x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
      } else {
        lives -= 1;
        if (!lives) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          ball.x = this.canvas.width / 2;
          ball.y = this.canvas.height - 30;
          ball.dx = 2;
          ball.dy = -2;
          paddleX = (this.canvas.width - paddle.width) / 2;
        }
      }
    }
  
    if (rightPressed && paddleX < this.canvas.width - paddle.width) {
      paddle.moveRight();
    } else if (leftPressed && paddle.x > 0) {
      paddle.moveLeft();
    }
  
    ball.x += ball.dx;
    ball.y += ball.dy;
    requestAnimationFrame(() => {
      this.run()
    });
  }
}
const game = new Game(ball, paddle, bricks, score, lives);

game.run();

