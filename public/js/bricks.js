
class Bricks {
  constructor(rowNum = 5, columnNum = 5) {
    this.rowNum = rowNum;
    this.columnNum = columnNum;
    this.padding = 10;
    this.width = 75;
    this.height = 20;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.bricksArr = [];
    this.create()
  }

  create() {
    for (let c = 0; c < this.columnNum; c += 1) {
      this.bricksArr[c] = []
      for (let r = 0; r < this.rowNum; r += 1) {
        const x = (r * (this.width + this.padding)) + this.offsetLeft;
        const y = (c * (this.height + this.padding)) + this.offsetTop;
        this.bricksArr[c][r] = new Brick(x, y)
      }
    }
  }

  render(ctx) {
    // * random brick colours
    
    for (let c = 0; c < this.columnNum; c += 1) {
      for (let r = 0; r < this.rowNum; r += 1) {
        if(this.bricksArr[c][r].status === 1) {
          this.bricksArr[c][r].render(ctx)
        }
        // let brick = bricks[c][r];
        // Dont set the x and y here
        //
        //colour = `hsl(${Math.random() * 360}, 50%, 50%)`
        // const brick = { x, y, status: 1, brick.colour };   
        // bricks[c][r] = brick; 
      }
    }
  }
}