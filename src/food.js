import { Board } from "./board";
import { Coordinate } from "./coordinate";

export class Food {
    #coordinate;

    constructor(x, y)
    {
        this.#coordinate = new Coordinate(+x, +y);
    }

    #getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    respawn()
    {
        let x = this.#getRandomArbitrary(0, Board.CELL_PER_WIDTH - 1);
        let y = this.#getRandomArbitrary(0, Board.CELL_PER_HEIGHT);

        this.#coordinate = new Coordinate(x, y);
    }

    getCoordinate()
    {
        return this.#coordinate;
    }

    isEaten(coord)
    {
        return (this.#coordinate.x === coord.x && this.#coordinate.y === coord.y);
    }

    static isFood(obj)
    {
        return obj instanceof Food;
    }
}