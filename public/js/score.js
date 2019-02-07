class Score {
  constructor(score = 0, font = '16px Arial', colour = '#0095DD') {
    this.font = font;
    this.colour = colour; 
    this.score = score; 
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.colour;
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
}