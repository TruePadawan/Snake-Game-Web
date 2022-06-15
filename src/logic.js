import { Board } from "./board";
import { Food } from "./food";
import { Snake } from "./snake";
import { Coordinate } from "./coordinate";
import { setGameOver } from "./global_data";

const board = document.querySelector(".board");
const snake = new Snake();
const food = new Food();
const delta_coordinate = new Coordinate(0, 1);

export function updateGameModels()
{
  if (snake.isAtBoundary())
  {
    setGameOver();
  }

  snake.move(delta_coordinate);
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
