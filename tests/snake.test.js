import { Coordinate } from "../src/coordinate";
import { Snake } from "../src/snake";

test("Snake must be instantiated with a coordinate", () => {
    expect(() => {
        new Snake();
    }).toThrow();
});

test("Snake should be able to grow", () => {
  const cord = new Coordinate(20, 11);
  const snake = new Snake(cord);
  snake.grow();
  expect(snake.segments.length).toBe(2);
});

test("Snake' checkForCollision method should return true when snake head collides with body", () => {
  const snake = new Snake(new Coordinate(20, 11));
  snake.grow();
  snake.grow();
  snake.grow();
  snake.grow();
  snake.grow();
  snake.segments[4].coordinate = new Coordinate(10, 10);
  snake.segments[0].coordinate = new Coordinate(10, 10);

  expect(snake.checkForCollision(snake.getHeadCoordinate())).toBeTruthy();
});

test("Snake' isAtBoundary method should return true when snake collides with wall", () => {
  const snake = new Snake(new Coordinate(20, 11));
  snake.segments[0].setCoordinate(new Coordinate(-1, 10));
  expect(snake.isAtBoundary()).toBeTruthy();
});

test("Snake segments' setCoordinate method should throw an exception when a non instance of the Coordinate class is passed", () => {
  const snake = new Snake(new Coordinate(20, 11));
  expect(() => { 
    snake.segments[0].setCoordinate(10);
  }).toThrow("Argument passed is not an instance of class - Coordinate");
});