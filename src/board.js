import { Food } from "./food";
import { Snake } from "./snake";

export class Board {
    static CELL_DIMENSION = 20;
    static CELL_PER_WIDTH = 20;
    static CELL_PER_HEIGHT = 20;

    static drawBoard(container)
    {
        for (let i = 0; i <this.CELL_PER_WIDTH; ++i)
        {
            for (let j = 0; j < this.CELL_PER_HEIGHT; ++j)
            {
                let node = document.createElement('div');
                node.className = `cell-${i}-${j}`;
                container.appendChild(node);
            }
        }
    }

    static drawSnake(snake)
    {
        if (!Snake.isSnake(snake))
        {
            throw new Error("Object passed is not an instance of class - Snake");
        }

        const snakeSegments = snake.segments;
        snakeSegments.forEach((segment) => {
            this.drawSegment(segment);
        });
    }

    static drawSegment(segment)
    {
        let coord = segment.getCoordinate();
        const cell = document.querySelector(`.cell-${coord.x}-${coord.y}`);
        cell.classList.toggle("segment");
    }

    static drawFood(food)
    {
        if (!Food.isFood(food))
        {
            throw new Error("Argmuent passed is not a valid instance of class - Food");
        }
        
        let coord = food.getCoordinate();

        const cell = document.querySelector(`.cell-${coord.x}-${coord.y}`);
        cell.classList.toggle("food");
    }
}