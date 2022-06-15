import { Board } from "./board";
import { Coordinate } from "./coordinate";

export class Food {
    #coordinate;

    constructor(x, y)
    {
        if (x !== undefined && y !== undefined)
        {
            this.#coordinate = new Coordinate(x, y);
            return;
        }
        
        do {
            this.respawn();
        } while (this.#coordinate.x === 10 && this.#coordinate.y <= 2);
    }

    #getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    respawn()
    {
        let x = this.#getRandomArbitrary(0, Board.CELL_PER_WIDTH - 1);
        let y = this.#getRandomArbitrary(0, Board.CELL_PER_HEIGHT - 1);
        this.#coordinate = new Coordinate(x, y);
    }

    getCoordinate()
    {
        return this.#coordinate;
    }

    isEaten(coord)
    {
        return (this.#coordinate.equal(coord));
    }

    static isFood(obj)
    {
        return obj instanceof Food;
    }
}