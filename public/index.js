const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
const paddleX = (canvas.width-paddleWidth)/2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c=0; c < brickColumnCount; c++){
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x:0, y:0}
    }
}


const keyDownHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }

    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

const keyUpHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }

    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawBricks = () => {
    for(let c = 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowCount; r++){
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(0, 0, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks()
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    }

    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

let interval = setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
