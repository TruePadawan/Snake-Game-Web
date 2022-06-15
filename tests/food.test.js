import { Coordinate } from "../src/coordinate";
import { Food } from "../src/food";
import { Snake } from "../src/snake";

test("Food object can respawn, which should change its coordinate", () => {
    const food = new Food();
    const coord = new Coordinate(0, 0);
    food.respawn();
    expect(coord.equal(food.getCoordinate())).not.toBeTruthy();
});

test("Food object are created on random positions", () => {
    const food1 = new Food();
    const food2 = new Food();
    expect(food1.getCoordinate().equal(food2.getCoordinate())).toBeFalsy();
})