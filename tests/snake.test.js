import { Coordinate } from "../src/coordinate";
import { Food } from "../src/food";
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

test("Snake object should be able to determine if a food object is at the same coord as any of its segments other than its head", () => {
  const snake = new Snake();
  const food = new Food(10, 1);
  expect(snake.checkForCollision(food.getCoordinate())).toBeTruthy();
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

test("Snake should be able to move by a coordinate", () => {
  const snake = new Snake();
  snake.move(new Coordinate(1, 0));
  const snakeCoord = snake.getHeadCoordinate();
  const assumedCoord = new Coordinate(11, 2);

  expect(snakeCoord.equal(assumedCoord)).toBeTruthy();
});

test("Snake should be able to move only by a coordinate of (0, 1) or (1, 0)", () => {
  const snake = new Snake();
  
  expect(() => {
    snake.move(new Coordinate(2, 3));
  }).toThrow("Invalid coordinate, sum of coordinate must be 1");
});