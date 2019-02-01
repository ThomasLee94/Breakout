class Brick {
  constructor(x, y, colour = '#0095DD') {
    this.colour = colour;
    this.width = 75;
    this.height = 20;
    this.status = 1;
    this.x = x; 
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.closePath();
  }
}
