export class Coordinate {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add(coordinate)
    {
        const isCoordinate = coordinate instanceof Coordinate;
        if (!isCoordinate)
        {
            throw new Error("Argument passed is not an instance of class - Coordinate");
        }
        this.x += coordinate.x;
        this.y += coordinate.y;
    }

    equal(coordinate)
    {
        if (!coordinate instanceof Coordinate)
        {
            throw new Error("Argument passed is not an instance of class - Coordinate");
        }
        return (this.x === coordinate.x && this.y === coordinate.y);
    }

    static isCoordinate(obj)
    {
        return obj instanceof Coordinate;
    }
}