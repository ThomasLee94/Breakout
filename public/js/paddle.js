export default class Paddle {
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