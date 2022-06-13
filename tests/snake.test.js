import { Coordinate } from "../src/coordinate";
import { Snake } from "../src/snake";

test("Snake should be able to grow", () => {
  const snake = new Snake();
  snake.grow();
  expect(snake.segments.length).toBe(4);
});

test("Snake' checkForCollision method should return true when snake head collides with body", () => {
  const snake = new Snake();
  snake.grow();
  snake.segments[3].setCoordinate(new Coordinate(10, 10));
  snake.segments[0].setCoordinate(new Coordinate(10, 10));

  expect(snake.checkForCollision(snake.getHeadCoordinate())).toBeTruthy();
});

test("Snake' isAtBoundary method should return true when snake collides with wall", () => {
  const snake = new Snake();
  snake.segments[0].setCoordinate(new Coordinate(-1, 10));
  expect(snake.isAtBoundary()).toBeTruthy();
});

test("Snake segments' setCoordinate method should throw an exception when a non instance of the Coordinate class is passed", () => {
  const snake = new Snake();
  expect(() => { 
    snake.segments[0].setCoordinate(10);
  }).toThrow("Argument passed is not an instance of class - Coordinate");
});

test("Snake' getHeadCoordinate should return the coordinate of the first segment i.e its head", () => {
  const snake = new Snake();
  
  expect(snake.getHeadCoordinate().x).toBe(10);
  expect(snake.getHeadCoordinate().y).toBe(2);
});