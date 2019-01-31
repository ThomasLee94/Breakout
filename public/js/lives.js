class Lives {
  constructor(font = '16px Arial', colour = '#0095DD', lives = 0){
    this.font = font;
    this.colour = colour;
    this.lives = lives
  }

  render (ctx) {
    ctx.font = this.font
    ctx.fillStyle = this.colour;
    ctx.fillText(`Lives: + ${lives}`, canvas.width - 65, 20);
  };
}