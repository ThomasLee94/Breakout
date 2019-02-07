/* eslint-disable class-methods-use-this */
// CLASSES IMPORTED FROM SCRIPTS IN HTML
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
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height - 30);
    this.paddle = new Paddle(this.canvas);
    this.bricks = new Bricks();
    this.bricks.create();
    this.score = new Score();
    this.lives = new Lives();


  }

  collisonDetection() {
    for (let c = 0; c < this.bricks.columnNum; c += 1) {
      for (let r = 0; r < this.bricks.rowNum; r += 1) {
        console.log(this.bricks.bricksArr)
        const brick = this.bricks.bricksArr[c][r];
        if (brick.status === 1) {
          if (this.ball.x > brick.x && this.ball.x < brick.x + brick.width && this.ball.y > brick.y && this.ball.y < brick.y + brick.height) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.score.score += 1;
            if (this.score.score === this.bricks.rowNum * this.bricks.columnNum) {
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
      this.paddle.paddleX = relativeX - this.paddle.width / 2;
    }
  }

  run() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.render(this.ctx);
    this.ball.move();
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.score.render(this.ctx);
    this.lives.render(this.ctx, this.canvas);
    this.collisonDetection();
  
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.lives.lives -= 1;
        if (!this.lives.lives) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddleX = (this.canvas.width - this.paddle.width) / 2;
        }
      }
    }
  
    if (this.rightPressed && this.paddle.paddleX < this.canvas.width - this.paddle.width) {
      this.paddle.moveRight();
    } else if (this.leftPressed && this.paddle.paddleX > 0) {
      this.paddle.moveLeft();
    }
  
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;
    requestAnimationFrame(() => {
      this.run()
    });
  }
}

const game = new Game();
game.run();
