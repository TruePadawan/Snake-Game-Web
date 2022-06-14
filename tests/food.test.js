import { Coordinate } from "../src/coordinate";
import { Food } from "../src/food";
import { Snake } from "../src/snake";

test("Food object can respawn, which should change its coordinate", () => {
    const food = new Food(0, 0);
    const coord = new Coordinate(0, 0);
    food.respawn();
    expect(coord.equal(food.getCoordinate())).not.toBeTruthy();
});


test("Food object' isEaten method should return true when snake is at the same coord as it", () => {
    const food = new Food(10, 3);
    const snake = new Snake();
    snake.move(new Coordinate(0, 1));
    
    expect(food.isEaten(snake.getHeadCoordinate())).toBeTruthy();
});