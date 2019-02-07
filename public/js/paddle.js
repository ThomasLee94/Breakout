class Paddle {
  constructor(canvas, height = 10, width = 75) {
    this.height = height;
    this.width = width;
    this.canvas = canvas; 
    this.x = (this.canvas.width - this.width) / 2; 
    this.paddleX = (this.canvas.width - this.width) / 2;
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
    ctx.rect(this.x, this.canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}