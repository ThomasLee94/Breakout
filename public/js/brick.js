class Brick {
  constructor(colour = '#0095DD') {
    this.colour = colour;
    this.width = 75;
    this.height = 20;
  }

  render(ctx, ball) {
    ctx.beginPath();
    ctx.rect(ball.x, ball.y, this.width, this.height);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.closePath();
  }
}
