var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//Upload main character image
var mainP = new Image(); mainP.src = "images/main.png";

//Upload train images
var train1 = new Image(); train1.src = "images/train1.png";
var train2 = new Image(); train2.src = "images/train2.png";

//Main Character settings
var sx = 0;
var sy = 0;
var swidth = 2081;
var sheight = 2081;
var x = 120;
var y = 245;
var width = 50;
var height = 50;

//Train1 variables
var tx1 = 272;
var ty1 = 305;
var tx2 = 322;
var ty2 = 405;
var tx3 = 373;
var ty3 = 500;
var tx4 = 473;
var ty4 = 320;
var tx5 = 523;
var ty5 = 500;
var tx6 = 573;
var ty6 = 350;
var tx7 = 673;
var ty7 = 320;
var tx8= 723;
var ty8 = 320;
var twidth = 45;
var theight = 120;



//Moving Main Character
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var up = true;
var down = true;
var right = true;
var left = true;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e)
{
    if(e.keyCode == 39) {rightPressed = true;}
    if(e.keyCode == 37) {leftPressed = true;}
    if(e.keyCode == 38) {upPressed = true;}
    if(e.keyCode == 40) {downPressed = true;}
}

function keyUpHandler(e)
{
    if(e.keyCode == 39) {rightPressed = false;}
    if(e.keyCode == 37) {leftPressed = false;}
    if(e.keyCode == 38) {upPressed = false;}
    if(e.keyCode == 40) {downPressed = false;}
}


//Draws background of the game
function drawBackground(){

//Side of tunnel
ctx.fillStyle = "grey";
ctx.fillRect(770,0,50,540)
ctx.fillRect(220,0,50,540)

//Making Dashed Lines
//x values to place dashed lines
var dashedLines = [320,370,420,470,520,570,620,670,720];
//Size of the Array
var dashedLength = dashedLines.length;

for(var i=0; i<dashedLength; i++){
    ctx.beginPath();
    ctx.moveTo(dashedLines[i], 0);
    ctx.lineTo(dashedLines[i],570);
    ctx.strokeStyle = "#9c5518";
    ctx.setLineDash([5]);
    ctx.strokeWidth = 2;
    ctx.stroke();
}

//Tracks
//Odd Tracks
var oddTrack = [270,320,370,420,470,520,570,620,670,720,770];
var oddLength = oddTrack.length;

for(var i = 0; i<oddLength; i+=2){
    for(var j = 50; j < 460; j += 100){
        ctx.beginPath();
        ctx.moveTo(oddTrack[i],j);
        ctx.lineTo(oddTrack[i+1],j);
        ctx.strokeStyle = "#9c5518";
        ctx.setLineDash([0]);
        ctx.strokeWidth = 4;
        ctx.stroke();
    }
}

//Even Tracks
var evenTrack = [320,370,420,470,520,570,620,670,720,770];
var evenLength =  evenTrack.length;

for(var i = 0; i<evenLength; i+=2){
    for(var j = 100; j <= 500; j += 100){
        ctx.beginPath();
        ctx.moveTo(evenTrack[i],j);
        ctx.lineTo(evenTrack[i+1],j);
        ctx.strokeStyle = "#9c5518";
        ctx.setLineDash([0]);
        ctx.strokeWidth = 4;
        ctx.stroke();
    }
}
//Score Board and Timer
ctx.fillStyle = "#12340d";
//start side
ctx.fillRect(0, 0, 220, 540);
//score board, timer side
ctx.fillRect(820, 0, 1000, 540);
}

//Draws Character
function drawMain(){
  ctx.drawImage(mainP,sx, sy, swidth, sheight, x,y, width,height);
}

//Draws train1
function createTrain(){
    //ctx.drawImage(train1, 900, 0, 1833, 1232, tx1, ty1, twidth, theight);


    var trainX = [tx1, tx2, tx3, tx4, tx5, tx6, tx7, tx8];
    var trainY = [ty1, ty2, ty3, ty4, ty5, ty6, ty7, ty8];

    for (i=0; i<trainX.length; i++){
        if (i % 2 == 0)
        {
            ctx.drawImage(train1, 0, 0, 1233, 1834, trainX[i], trainY[i], twidth, theight);
        }
        else
        {
            ctx.drawImage(train2, 0, 0, 1233, 1834, trainX[i], trainY[i], twidth, theight);
        }
    }
}



function moveTrains(){

    count1 = 0;

    if (ty1 < canvas.height) {
        ty1 += 2.5;
    }
    else {
        ty1 = -90;
    }

    if (ty2 < canvas.height) {
        ty2 += 5;
    }
    else {
        ty2 = -90;
    }

    if (ty3 < canvas.height) {
        ty3 += 4;
    }
    else {
        ty3 = -90;
    }

    if (ty4 < canvas.height) {
        ty4 += 5;
    }
    else {
        ty4 = -90;
    }

    if (ty5 < canvas.height) {
        ty5 += 1.5;
    }
    else {
        ty5 = -90;
    }

    if (ty6 < canvas.height) {
        ty6 += 3;
    }
    else {
        ty6 = -90;
    }

    if (ty7 < canvas.height) {
        ty7 += 5;
    }
    else {
        ty7 = -90;
    }
    if (ty8 < canvas.height) {
        ty8 += 2;
    }
    else {
        ty8 = -90;
    }
}

//function to detect hobo-train collisions
var count = 10;

function getHit(){
    var trainX = [tx1, tx2, tx3, tx4, tx5, tx6, tx7, tx8];
    var trainY = [ty1, ty2, ty3, ty4, ty5, ty6, ty7, ty8];
    for (i = 0; i < trainX.length; i++)
    {
       if (trainX[i] <= x + width && trainX[i] + twidth >= x
        && trainY[i] + theight >= y && trainY[i] <= y + height){
            drawHealth(health,10,10,500,50,100-count,100);
            count = count + 10;
            x = 120;
            y = 245;


        }
    }

}

//Moves Character
function moveMain(){
    if (upPressed == true && up == true){
        y = y - 50;
        up = false;
        }
    if (upPressed==false){
        up = true;
        }
    if (downPressed == true && down == true){
        y = y + 50;
        down = false;
        }
    if (downPressed==false){
        down = true;
        }
    if (leftPressed == true && left == true){
        x = x - 50;
        left = false;
        }
    if (leftPressed==false){
        left = true;
        }
    if (rightPressed == true && right == true){
        x = x + 50;
        right = false;
        }
    if (rightPressed==false){
        right = true;
        }
}

//Draw health bar

var health = document.getElementById('health').getContext('2d');


function drawHealth(layout, x,y,width,height,health, maxhealth){
  if(health>= maxhealth){health = maxhealth;}
  if(health<=0){health=0;}
  layout.fillStyle = '#000000';
  layout.fillRect(x,y,width,height);
  var colorNumber = Math.round((1-(health/maxhealth))*0xff)*0x10000 + Math.round((health/maxhealth)*0xff)*0x100;
  var colorString = colorNumber.toString(16);
  if(colorNumber >= 0x100000){
    layout.fillStyle= '#' + colorString;
  }else if (colorNumber << 0x100000 && colorNumber >= 0x10000){
    layout.fillStyle = '#0' + colorString;
  }else if(colorNumber << 0x10000){
    layout.fillStyle = '#00' + colorString;
  }

  layout.fillRect(x+1, y+1, (health/maxhealth)*(width-2), height-2);
}

//Draws everything
drawHealth(health,10,10,500,50,100,100);
function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBackground();
    drawMain();
    moveMain();
    requestAnimationFrame(draw);
    createTrain();
    moveTrains();
    getHit();
}

//Calls draw function
draw();
