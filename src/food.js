import { Board } from "./board";
import { Coordinate } from "./coordinate";

export class Food {
    #coordinate;

    constructor()
    {
        this.respawn();
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
        return (this.#coordinate.x === coord.x && this.#coordinate.y === coord.y);
    }

    static isFood(obj)
    {
        return obj instanceof Food;
    }
}