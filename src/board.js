import { Food } from "./food";
import { Snake } from "./snake";

export class Board {
    static CELL_DIMENSION = 20;
    static CELL_PER_WIDTH = 20;
    static CELL_PER_HEIGHT = 20;

    static drawBoard(container)
    {
        for (let y = 0; y < this.CELL_PER_HEIGHT; ++y)
        {
            for (let x = 0; x < this.CELL_PER_WIDTH; ++x)
            {
                let node = document.createElement('div');
                node.className = `cell coord-${x}-${y}`;
                container.appendChild(node);
            }
        }
    }

    static clearBoard(container)
    {
        container.childNodes.forEach(node => {
            node.classList.remove("food");
            node.classList.remove("segment");
            node.classList.remove("head");
        });
    }

    static drawSnake(snake)
    {
        if (!Snake.isSnake(snake))
        {
            throw new Error("Object passed is not an instance of class - Snake");
        }

        const snakeSegments = snake.segments;
        snakeSegments.forEach((segment, index) => {
            this.drawSegment(segment, index);
        });
    }

    static drawSegment(segment, index)
    {
        let coord = segment.getCoordinate();
        const cell = document.querySelector(`.coord-${coord.x}-${coord.y}`);
        cell.classList.toggle("segment");
        if (index === 0)
        {
            cell.classList.toggle("head");
        }
    }

    static drawFood(food)
    {
        if (!Food.isFood(food))
        {
            throw new Error("Argmuent passed is not a valid instance of class - Food");
        }
        
        let coord = food.getCoordinate();

        const cell = document.querySelector(`.coord-${coord.x}-${coord.y}`);
        cell.classList.toggle("food");
    }
}