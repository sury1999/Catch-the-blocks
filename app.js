document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
let timerId;
const width = 40;
let score = 0;

//platform
const platform = [0, 1, 2, 3, 4];

//blocks of different sizes
const size1 = [
  [1],
  [1],
  [1]
];

const size2 = [
  [1, width + 1],
  [1,2],
  [1, width + 1]
];

const size4 = [
  [1, 2, 3, 4],
  [1, width + 1, 2*width + 1, 3*width + 1],
  [1, 2, width + 1, width + 2]
];

const blocks = [size1, size2, size4];

let currentPosition = 9;

let currentPlatformPosition = 778;

let random = Math.floor(Math.random()*blocks.length);
let current = blocks[random][random];

//draw the platform
function drawPlatform() {
  platform.forEach(index => {
    squares[currentPlatformPosition + index].classList.add('platform');
  })
}

function undrawPlatform() {
  platform.forEach(index => {
    squares[currentPlatformPosition + index].classList.remove('platform');
  })
}

// draw the blocks
function draw() {
  current.forEach(index =>  {
    squares[currentPosition + index].classList.add('block');
  })
}

// remove the blocks
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('block');
  })
}

//move down function
function moveDown() {
  undraw();
  currentPosition += width;
  draw();

  //need to write
  remove();



}

// controls the platform
function control(e)
{
  if(e.keyCode === 37)
  {
  moveLeft();
  }
  else if(e.keyCode === 39)
  {
    moveRight();
  }
}
document.addEventListener('keyup', control)

//move platform left until at the edge
function moveLeft() {
   undrawPlatform();
   const isAtLeftEdge = platform.some(index => (currentPlatformPosition + index) % width === 0);
   if(!isAtLeftEdge) currentPlatformPosition -=1;
   drawPlatform();
 }

 //move platform right until at the edge
 function moveRight() {
    undrawPlatform();
    const isAtRightEdge = platform.some(index => (currentPlatformPosition + index) % width === 39);
    if(!isAtRightEdge) currentPlatformPosition +=1;
    drawPlatform();
  }

//start button functionality a
  startBtn.addEventListener('click', () => {
  if(timerId)
  {
    clearInterval(timerId);
    timerId = null;
  }
  else
  //diff fall speeds for diff blocks
  {
    if(random == 0)
    {
    timerId = setInterval(moveDown, 1000);
    }
    else if(random == 1)
    {
      timerId = setInterval(moveDown, 500);
    }
    else if(random == 2)
    {
      timerId = setInterval(moveDown, 250);
    }
    random = Math.floor(Math.random()*blocks.length);

  }
})



draw();
drawPlatform();

//freeze function also
//platform function
//score
//add blocks diff timerid


})
