//main function and utilities for game

// SELECT CANVAS ELEMENT
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS
cvs.style.border = "3px solid black";

// MAKE LINE THIK WHEN DRAWING TO CANVAS
ctx.lineWidth = 5;

// GAME VARIABLES AND CONSTANTS
const add_play = false;
const PADDLE_WIDTH = 135;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 10;
const gift_RADIUS = 10;
let LIFE = 3; // PLAYER HAS 3 LIVES
let SCORE = 0;
const SCORE_UNIT = 10;
let LEVEL = 1;
const MAX_LEVEL = 3;
let GAME_OVER = false;
let leftArrow = false; // both right and left are false to be stay in there place without moving 
let rightArrow = false;
let isDarkClicked = false;
let interval = setTimeout(update, 20);
//=============================================================================================
//start paddel
// CREATE THE PADDLE
const paddle = {
    x: cvs.width / 2 - PADDLE_WIDTH / 2,
    y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 10  //delta x paddel speed
}

// DRAW PADDLE
function drawPaddle() {
    ctx.fillStyle = "red";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, [40]);
    // ctx.roundRect(10, 20, 150, 100, [40]);
    // ctx.strokeStyle = "blue";
    // ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
//عشان نتحكم فى المضرب هنستخدم  الاسكى كود بتاع الحروف للاتجاة شمال ويمين
// CONTROL THE PADDLE
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37) {
        leftArrow = true;
    } else if (event.keyCode == 39) {
        rightArrow = true;
    }
});
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 37) {
        leftArrow = false;
    } else if (event.keyCode == 39) {
        rightArrow = false;
    }
});

//centralized baddel when restart or loose life
function paddeleReset() {
    paddle.x = cvs.width / 2 - PADDLE_WIDTH / 2;
    paddle.y = cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT;
}
// MOVE PADDLE
function movePaddle() {
    if (rightArrow && paddle.x + paddle.width < cvs.width) { //if press right arrow and paddle size was less than canvas width move else donnot move
        paddle.x += 0.5 * paddle.dx;
    } else if (leftArrow && paddle.x > 0) {
        paddle.x -= 0.5 * paddle.dx;
    }
}
//end paddel
//=======================================================================================
//start ball
//draw th ball is the most difficult part and most importanat part 
//ball direction - ball speed movement - ball boundary - ball path - pall collision
// circle in canvas is ARC
// CREATE THE BALL
const ball = {
    x: cvs.width / 2,
    y: paddle.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    speed: 6,
    dx: 1 * (Math.random() * 2 - 1),
    dy: -1
}

// DRAW THE BALL
function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#F8F8FF";
    ctx.fill();

    // ctx.strokeStyle = "black";
    // ctx.stroke();

    ctx.closePath();
}

// MOVE THE BALL
function moveBall() {
    ball.x += 0.60 * ball.dx;
    ball.y += 0.60 * ball.dy;
}

// BALL AND WALL COLLISION DETECTION
function ballWallCollision() {
    if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
        ball.dx = - ball.dx;
        WALL_HIT.play();  //audio for collosion left/right sound 
    }

    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
        WALL_HIT.play();   //audio for collosion up/down sound
    }

    if (ball.y + ball.radius > cvs.height) {  //if ball collision in down
        LIFE--; // LOSE LIFE 3-1
        LIFE_LOST.play();
        paddeleReset();
        resetBall();
    }
}

// RESET THE BALL
function resetBall() {
    ball.x = cvs.width / 2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 1 * (Math.random() * 2 - 1);
    ball.dy = -1;
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision() {
    if (ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {

        // PLAY SOUND
        PADDLE_HIT.play();

        // CHECK WHERE THE BALL HIT THE PADDLE
        let collidePoint = ball.x - (paddle.x + paddle.width / 2);

        // NORMALIZE THE VALUES
        collidePoint = collidePoint / (paddle.width / 2);

        // CALCULATE THE ANGLE OF THE BALL
        let angle = collidePoint * Math.PI / 3;


        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

//end ball
//===================================================================================================

//start breakable bricks
//we need to image for bricks first hit bricks smei smashed second hit bricks totally smashed
//random generate for bricks
//-----------------------------------------------------------------
// CREATE THE BRICKS
const brick = {
    row: 5,
    column: 7,
    width: 75,
    height: 20,
    offSetLeft: 20,
    offSetTop: 30,
    marginTop: 20,
    fillColor: "#BB480D",
    // strokeColor: "green"
}
let bricks = new Array(brick.row);

function createBricks() {
    for (let r = 0; r < brick.row; r++) {
        bricks[r] = new Array(brick.column);
        for (let c = 0; c < brick.column; c++) {
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true, //show brick status if it false brick is already broken if true brick is not broken
                hits: 2,
                fillColor: "#BB480D"
            }
        }
    }
}
createBricks();

// draw the bricks
function drawBricks() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            if (bricks[r][c].status && bricks[r][c].hits === 2) {
                brick.fillColor = "#471212";
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
            }
            else if (bricks[r][c].status && bricks[r][c].hits === 1) {
                brick.fillColor = "#A13434";
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
            }
            // let b = bricks[r][c];
            // // if the brick isn't broken
            // if(b.status && b.hit)
            // {
            //     // brick.fillColor = getRandomColor();
            //     ctx.fillStyle = brick.fillColor;
            //     ctx.fillRect(b.x, b.y, brick.width, brick.height);

            //     // ctx.strokeStyle = brick.strokeColor;
            //     // ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            // }
        }
    }
}

// ball brick collision
function ballBrickCollision()
{
    for(let r = 0; r < brick.row; r++)
    {
        for(let c = 0; c < brick.column; c++)
        {
            let b = bricks[r][c];
            // if the brick isn't broken
            if(b.status == true && b.hits > 0)
            {  
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height)
                {
                    BRICK_HIT.play();
                    //we need to add here ball bricks from two hits not one hits
                    bricks[r][c].hits--;
                    
                    if(bricks[r][c].hits == 1)
                    {
                        console.log('tamam');
                        b.fillColor = "gray";
                        ctx.fillStyle = b.fillColor;
                        ctx.fillRect(b.x, b.y, brick.width, brick.height);
                        // newrow = r;
                        // col = c;
                        // console.log(newrow);
                        // console.log(col);
                    }
                    // bricks[r][c].fillColor = "#0000ff";
                    // ctx.fillStyle = bricks[r][c].fillColor;
                    // ctx.fillRect(b.x, b.y, brick.width, brick.height);
                    ball.dy = - ball.dy;
                    // b.status = true; // the brick is broken
                    SCORE += SCORE_UNIT;
                }
            }
            else if(b.hits === 0)
            {
                b.status = false;
                // SCORE += SCORE_UNIT;
            }
        }
    }
}
           
// //GIFT INSIDE BRICKS
// let gift = {
//     x: cvs.width / 2,
//     y: paddle.y - BALL_RADIUS,
//     radius: BALL_RADIUS,
//     // dx: 1,
//     dy: 1,
//     speed: 1,
// };

// //draw gift
// function drawGift() {
//     ctx.beginPath();

//     ctx.arc(gift.x, gift.radius, 0, Math.PI * 2);
//     ctx.fillStyle = "#F8F8FF";
//     ctx.fill();

//     // ctx.strokeStyle = "black";
//     // ctx.stroke();

//     ctx.closePath();
// }

// // MOVE THE BALL
// function moveBall() {
//     // gift.x += gift.dx;
//     gift.y += gift.dy;
// }

// //ball after collision with bricks falling from bricks gift
// function ballBrickGiftCollision() {
//     for (let r = 0; r < brick.row; r+2) {
//         for (let c = 0; c < brick.column; c+4) {
//             let b = bricks[r][c];
//             // if the brick isn't broken
//             if (b.status) {
//                 if (ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {
//                     BRICK_HIT.play();
//                     //we need to add here ball bricks from two hits not one hits
//                     ball.dy = - ball.dy;
//                     b.status = false; // the brick is broken
//                     SCORE += SCORE_UNIT;
//                 }
//             }
//         }
//     }
// }

// //gift collision with paddele
// const gift = {
//     x: cvs.width / 2,
//     y: paddle.y - gift_RADIUS,
//     radius: gift_RADIUS,
//     speed: 1,
//     dx: 1 * (Math.random() * 2 - 1),
//     dy: -1
// }
// var lifeSprite = new Image();
// lifeSprite.src = "./img/life.png";

// function drawLife() {
//     //   ctx.drawImage(lifeSprite, life.X, life.Y, lifeWidth, lifeHeight);
//     ctx.arc(life.x, life.radius, 0, Math.PI * 2);
// }
// function checkLifeCollision() {
//     if (paddle.x < gift.X + gift.radius &&
//         paddle.x + PADDLE_WIDTH > gift.X &&
//         paddle.y < gift + gift.radius &&
//         PADDLE_HEIGHT + paddle.y > gift.Y) {
//         // Remove the life icon from the screen
//         gift.x = -100;
//         gift.y = -100;
//     }
// }
// function gameLoop() {
//     loop();
//     checkLifeCollision();
// }





// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY) {
    // draw text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px One";
    ctx.fillText(text, textX, textY);

    // draw image
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25); //every image icon have same size 25*25
}

// DRAW FUNCTION
function draw() {
    drawPaddle();

    drawBall();

    drawBricks();

    // SHOW SCORE
    showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);  //(score , x , y , score img icon ,x ,y)
    // SHOW LIVES
    showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width - 55, 5);
    // SHOW LEVEL
    showGameStats(LEVEL, cvs.width / 2, 25, LEVEL_IMG, cvs.width / 2 - 30, 5);
}

// game over
function gameOver() {
    if (LIFE <= 0) {
        showYouLose();
        GAME_OVER = true;
    }
}

// level up
function levelUp() {
    let isLevelDone = true;

    // check if all the bricks are broken
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            isLevelDone = isLevelDone && !bricks[r][c].status;
        }
    }

    if (isLevelDone) {
        WIN.play();

        if (LEVEL >= MAX_LEVEL) {
            showYouWin();
            GAME_OVER = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 0.3;
        paddeleReset();
        resetBall();
        LEVEL++;
    }
}

// UPDATE GAME FUNCTION
function update() {
    if (isPaused == false) {
        movePaddle();

        moveBall();

        ballWallCollision();

        ballPaddleCollision();

        ballBrickCollision();

        gameOver();

        levelUp();
    }

}

class Brick {
    constructor() {
        this.hitCount = 0;
    }
}
//احنا هنعمل الكورة زى المضرب فهنخلى المضرب يتكرر بس فى صورة كورة 
// GAME LOOP
function loop() {
    // CLEAR THE CANVAS
    ctx.drawImage(BG_IMG, 0, 0, 900, 700);

    draw();

    update();

    if (!GAME_OVER) {
        requestAnimationFrame(loop);
    }
    // In your game loop:
    if (ballBrickCollision) {
        brick.hitCount++;
        if (brick.hits === 2) {
            brick.break();
            brick.hits = 0;
        }
    }
}


// SELECT SOUND ELEMENT
const soundElement = document.getElementById("sound");

soundElement.addEventListener("click", audioManager);

function audioManager() {
    // CHANGE IMAGE SOUND_ON/OFF
    let imgSrc = soundElement.getAttribute("src");
    let SOUND_IMG = imgSrc == "img/SOUND_ON.png" ? "img/SOUND_OFF.png" : "img/SOUND_ON.png";

    soundElement.setAttribute("src", SOUND_IMG);

    // MUTE AND UNMUTE SOUNDS
    WALL_HIT.muted = WALL_HIT.muted ? false : true;
    PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
    BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
    WIN.muted = WIN.muted ? false : true;
    LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
}

// SHOW GAME OVER MESSAGE
/* SELECT ELEMENTS */
const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwin");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");
const puasee = document.getElementById("pauseBtn");
const dark_mode = document.getElementById("dark_btn");

// CLICK pause BUTTON to stop game
// restart.addEventListener("click", function(){
//     location.(); // pause the page
// })
// CLICK ON PLAY AGAIN BUTTON
restart.addEventListener("click", function () {
    location.reload(); // reload the page
})

// add_play.addEventListener("click", function () {
//     location.reload(); // reload the page
// })

// SHOW YOU WIN
function showYouWin() {
    gameover.style.display = "block";
    youwon.style.display = "block";
}

// SHOW YOU LOSE
function showYouLose() {
    gameover.style.display = "block";
    youlose.style.display = "block";
}
//Dark Mode Display
dark_mode.addEventListener("click",function(){
    switch (isDarkClicked) {
        case false:
            BG_IMG.src = "img/DarkMode.jpg";
            // document.getElementsByTagName('body').style.backgroundcolor="#01435B";
            document.body.style.backgroundColor = "#424043";
            isDarkClicked=true;
            break;
            case true:
                // cvs.style.backgroundColor = "#F2DEBA";
                BG_IMG.src='img/ligght.jpg';
                // document.getElementsByTagName('body').style.backgroundcolor="#FFFBF5";
                document.body.style.backgroundColor = "#F2DEBA";
                // brick.fillColor = "black";
                isDarkClicked=false;
            break;
        default:
            break;
    }
});
// Initialize the button and a variable to keep track of the game state
let playing = document.getElementById("start");
let gamePlay = false;

// Add an event listener to the button to toggle the game state
playing.addEventListener("click", function () {

    gamePlay = true;
    playing.style.display='none';
    playing.innerHTML = "increase ball speed";
    start_button_audio.play();
    setTimeout(function () {
        start();
    }, 2000);

});

// Example function to start the game
function start() {
    loop();
}


let isPaused = false;

function pauseGame() {
    clearInterval(interval);

}

function resumegame() {
    isPaused = false;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    cvs.style.opacity = 1
    interval = setInterval(loop, 20)
}

document.addEventListener('keyup', function (e) {
    if (e.which === 27) {
        switch (isPaused) {
            case false:
                loop()
                isPaused = true;
                break;
            case true:
                pauseGame();
                isPaused = false;
                break;
            default:
                break;
        }
    }
});

//button to generate random color for body
let ranbtn = document.querySelector('#ran-btn');
 ranbtn.addEventListener('click',() => {
    let x = '#' + Math.random().toString(16).slice(2-8);
    document.body.style.backgroundColor = x;
 });




