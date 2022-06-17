import { Board } from "./board";
import { Food } from "./food";
import { Snake } from "./snake";
import { Coordinate } from "./coordinate";
import { getMillisecondPerMovement, setMillisecondPerMovement, setGameOver, isGameStarted } from "./global_data";

const board = document.querySelector(".board");
const snake = new Snake();
const food = new Food();
let delta_coordinate = new Coordinate(0, 1);

const LEFT_KEY = "ArrowLeft";
const RIGHT_KEY = "ArrowRight";
const UP_KEY = "ArrowUp";
const DOWN_KEY = "ArrowDown";
let moved;

let touchXstart, touchXend;
let touchYstart, touchYend;

const foodEatedSound = new Audio("./sounds/snake-eat.wav");
const gameOverSound = new Audio("./sounds/game-over.wav");

export function init()
{
  Board.drawBoard(board);
  Board.drawFood(food);
  Board.drawSnake(snake);

  // KEYBOARD CONTROLS
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (moved === false) return; // IF THE SNAKE HASN'T MOVED, DON'T TAKE A NEW INPUT
    if (key === LEFT_KEY && delta_coordinate.x !== 1)
    {
      delta_coordinate = new Coordinate(-1, 0);
    }
    if (key === UP_KEY && delta_coordinate.y !== 1)
    {
      delta_coordinate = new Coordinate(0, -1);
    }
    if (key === DOWN_KEY && delta_coordinate.y !== -1)
    {
      delta_coordinate = new Coordinate(0, 1);
    }
    if (key === RIGHT_KEY && delta_coordinate.x !== -1)
    {
      delta_coordinate = new Coordinate(1, 0);
    }
    moved = false;
  });

  // TOUCHSCREEN CONTROLS
  document.addEventListener('touchstart', (e) => {
    touchXstart = e.changedTouches[0].screenX;
    touchYstart = e.changedTouches[0].screenY;
  });

  document.addEventListener('touchmove', (e) => {
    touchXend = e.changedTouches[0].screenX;
    touchYend = e.changedTouches[0].screenY;

    const xDiff = touchXend - touchXstart;
    const yDiff = touchYend - touchYstart;

    if (Math.sqrt(xDiff * xDiff + yDiff * yDiff) < 22 || !isGameStarted()) return;

    touchXstart = touchXend;
    touchYstart = touchYend;

    let swipeAngle = ((Math.atan2(yDiff, xDiff) / Math.PI) * 180 + 360) % 360;
    if (swipeAngle >= 45 && swipeAngle < 135 && delta_coordinate.y !== -1)
    {
      delta_coordinate = new Coordinate(0, 1);
    }
    else if (swipeAngle >= 135 && swipeAngle < 225 && delta_coordinate.x !== 1)
    {
      delta_coordinate = new Coordinate(-1, 0)
    }
    else if (swipeAngle >=225 && swipeAngle < 315 && delta_coordinate.y !== 1)
    {
      delta_coordinate = new Coordinate(0, -1);
    }
    else if (swipeAngle >= 315 || swipeAngle < 45)
    {
      if (delta_coordinate.x !== -1)
      {
        delta_coordinate = new Coordinate(1, 0);
      }
    }
  });
}

export function updateGameModels()
{
  if (food.isEaten(snake.getHeadCoordinate())) { // RESPAWN FOOD AT A PLACE NOT WHERE SNAKE IS
    snake.grow();
    foodEatedSound.play();

    do {
      food.respawn();
    } while (snake.checkForCollision(food.getCoordinate()) || food.isEaten(snake.getHeadCoordinate()));

    const currentMillisecondPerMovement = getMillisecondPerMovement();
    if (currentMillisecondPerMovement > 50)
    {
      setMillisecondPerMovement(currentMillisecondPerMovement - 5);
    }
  }
  
  snake.move(delta_coordinate);
  moved = true;
  if (snake.isAtBoundary() || snake.checkForCollision(snake.getHeadCoordinate())) {
    setGameOver();
    gameOverSound.play();
  }
}

export function composeFrame()
{
  try {
    Board.clearBoard(board);
    Board.drawFood(food);
    Board.drawSnake(snake);
  }
  catch (err)
  {
    console.log(err.message);
  }  
}
