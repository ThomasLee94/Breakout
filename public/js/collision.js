class Collision {
  constructor(bricks, ball, b){
    this.bricks = bricks
    this.ball = ball
    this.b = b 
  }

  detection() {
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
  }
}