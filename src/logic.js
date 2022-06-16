import { Board } from "./board";
import { Food } from "./food";
import { Snake } from "./snake";
import { Coordinate } from "./coordinate";
import { setGameOver } from "./global_data";

const board = document.querySelector(".board");
const snake = new Snake();
const food = new Food();
let delta_coordinate = new Coordinate(0, 1);

const LEFT_KEY = "ArrowLeft";
const RIGHT_KEY = "ArrowRight";
const UP_KEY = "ArrowUp";
const DOWN_KEY = "ArrowDown";

export function init()
{
  Board.drawBoard(board);
  Board.drawFood(food);
  Board.drawSnake(snake);

  document.addEventListener('keydown', (event) => {
    const key = event.key;
    
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

  });
}

export function updateGameModels()
{
  if (food.isEaten(snake.getHeadCoordinate())) { // RESPAWN FOOD AT A PLACE NOT WHERE SNAKE IS
    snake.grow();

    do {
      food.respawn();
    } while (snake.checkForCollision(food.getCoordinate()) || food.isEaten(snake.getHeadCoordinate()));
  }
  
  snake.move(delta_coordinate);
  if (snake.isAtBoundary() || snake.checkForCollision(snake.getHeadCoordinate())) {
    setGameOver();
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
