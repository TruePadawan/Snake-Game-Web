import { Coordinate } from "./coordinate";
import { Board } from "./board";

export class Snake {
    static #headColor = "green";
    static #bodyColor = "yellow";

    constructor()
    {
        const snakeHead = new Segment(10, 2);
        this.segments = [snakeHead, new Segment(10, 1), new Segment(10, 0)];
    }

    move(delta_coord)
    {
        if ((Math.abs(delta_coord.x) + Math.abs(delta_coord.y)) !== 1)
        {
            throw new Error("Invalid coordinate, sum of coordinate must be 1")
        }

        for (let i = this.segments.length - 1; i > 1; --i)
        {
            this.segments[i].follow(this.segments[i-1]);
        }
        this.segments[0].move(delta_coord);
    }

    grow()
    {
        const newSegment = new Segment(0, 0);
        this.segments.push(newSegment);
    }

    checkForCollision(coord)
    {
        if (!Coordinate.isCoordinate(coord))
        {
            throw new Error("Argument passed is not an instance of class - Coordinate");
        }

        if (this.segments.length === 1) return false;
        for (let i = 1; i < this.segments.length; ++i)
        {
            const segmentCoord = this.segments[i].getCoordinate();
            if (segmentCoord.equal(coord))
            {
                return true;
            }
        }
        return false;
    }

    getHeadCoordinate()
    {
        return this.segments[0].getCoordinate();
    }

    isAtBoundary()
    {
        const snakeHead = this.getHeadCoordinate();
        return (snakeHead.x >= Board.CELL_PER_WIDTH ||
                snakeHead.y >= Board.CELL_PER_HEIGHT ||
                snakeHead.x < 0 || snakeHead.y < 0);
    }

    static isSnake(obj)
    {
        return obj instanceof Snake;
    }
}


class Segment {
    #coordinate;
    constructor(x, y)
    {
        this.#coordinate = new Coordinate(x, y);
    }

    follow(segment)
    {
        const isSegment = segment instanceof Segment;
        if (!isSegment)
        {
            throw new Error("Argument passed is not an instance of class - Segment");
        }
        this.#coordinate = segment.coordinate;
    }

    setCoordinate(coord)
    {
        if (!Coordinate.isCoordinate(coord))
        {
            throw new Error("Argument passed is not an instance of class - Coordinate");
        }

        this.#coordinate = coord;
    }

    getCoordinate()
    {
        return this.#coordinate;
    }

    move(delta_coord)
    {
        if (!Coordinate.isCoordinate(delta_coord))
        {
            throw new Error("Argument passed is not an instance of class - Coordinate");
        }

        if ((Math.abs(delta_coord.x) + Math.abs(delta_coord.y)) === 1)
        {
            this.#coordinate.add(delta_coord);
            return;
        }
        throw new Error("Not a valid delta coordinate");
    }
}