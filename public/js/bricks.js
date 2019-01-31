import { Brick } from './brick.js';

export default class Bricks {
  constructor(rowNum = 5, columnNum = 5) {
    this.rowNum = rowNum;
    this.columnNum = columnNum;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.bricks = [];
  }

  create() {
    for (let c = 0; c < this.columnNum; c += 1) {
      for (let r = 0; r < this.rowNum; r += 1) {
        this.bricks[c][r] = new Brick(c, r)
      }
    }
  }

  render() {
    // * random brick colours
    for (let c = 0; c < brick.columnCount; c += 1) {
      bricks[c] = []; // [ [], [], [] ]
      for (let r = 0; r < brick.rowCount; r += 1) {
        // let brick = bricks[c][r];
        const x = (r * (brick.width + brick.padding)) + brick.offsetLeft;
        const y = (c * (brick.jeight + brick.padding)) + brick.offsetTop;
        colour = `hsl(${Math.random() * 360}, 50%, 50%)`
        const brick = { x, y, status: 1, colour };   
        bricks[c][r] = brick 
      }
    }
  }
}