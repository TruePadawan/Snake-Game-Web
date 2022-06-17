/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Board": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./food */ "./src/food.js");
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snake */ "./src/snake.js");



class Board {
    static CELL_DIMENSION = 20;
    static CELL_PER_WIDTH = 20;
    static CELL_PER_HEIGHT = 20;

    static drawBoard(container)
    {
        for (let y = 0; y < this.CELL_PER_HEIGHT; ++y)
        {
            for (let x = 0; x < this.CELL_PER_WIDTH; ++x)
            {
                let node = document.createElement('div');
                node.className = `cell coord-${x}-${y}`;
                container.appendChild(node);
            }
        }
    }

    static clearBoard(container)
    {
        container.childNodes.forEach(node => {
            node.classList.remove("food");
            node.classList.remove("segment");
            node.classList.remove("head");
        });
    }

    static drawSnake(snake)
    {
        if (!_snake__WEBPACK_IMPORTED_MODULE_1__.Snake.isSnake(snake))
        {
            throw new Error("Object passed is not an instance of class - Snake");
        }

        const snakeSegments = snake.segments;
        snakeSegments.forEach((segment, index) => {
            this.drawSegment(segment, index);
        });
    }

    static drawSegment(segment, index)
    {
        let coord = segment.getCoordinate();
        const cell = document.querySelector(`.coord-${coord.x}-${coord.y}`);
        cell.classList.toggle("segment");
        if (index === 0)
        {
            cell.classList.toggle("head");
        }
    }

    static drawFood(food)
    {
        if (!_food__WEBPACK_IMPORTED_MODULE_0__.Food.isFood(food))
        {
            throw new Error("Argmuent passed is not a valid instance of class - Food");
        }
        
        let coord = food.getCoordinate();

        const cell = document.querySelector(`.coord-${coord.x}-${coord.y}`);
        cell.classList.toggle("food");
    }
}

/***/ }),

/***/ "./src/coordinate.js":
/*!***************************!*\
  !*** ./src/coordinate.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Coordinate": () => (/* binding */ Coordinate)
/* harmony export */ });
class Coordinate {
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

/***/ }),

/***/ "./src/food.js":
/*!*********************!*\
  !*** ./src/food.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Food": () => (/* binding */ Food)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _coordinate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coordinate */ "./src/coordinate.js");



class Food {
    #coordinate;

    constructor(x, y)
    {
        if (x !== undefined && y !== undefined)
        {
            this.#coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, y);
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
        let x = this.#getRandomArbitrary(0, _board__WEBPACK_IMPORTED_MODULE_0__.Board.CELL_PER_WIDTH - 1);
        let y = this.#getRandomArbitrary(0, _board__WEBPACK_IMPORTED_MODULE_0__.Board.CELL_PER_HEIGHT - 1);
        this.#coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, y);
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

/***/ }),

/***/ "./src/global_data.js":
/*!****************************!*\
  !*** ./src/global_data.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMillisecondPerMovement": () => (/* binding */ getMillisecondPerMovement),
/* harmony export */   "isGameOver": () => (/* binding */ isGameOver),
/* harmony export */   "isGameStarted": () => (/* binding */ isGameStarted),
/* harmony export */   "setGameOver": () => (/* binding */ setGameOver),
/* harmony export */   "setMillisecondPerMovement": () => (/* binding */ setMillisecondPerMovement),
/* harmony export */   "startGame": () => (/* binding */ startGame)
/* harmony export */ });
let gameStarted = false;
let gameOver = false;
let MILLISECOND_PER_MOVEMENT = 100;

const setGameOver = (callback) => {
    gameOver = true;
    document.querySelector(".game-over").classList.toggle("true");
    if (callback !== undefined)
    {
        callback();
    }
}

const startGame = () => {
    gameStarted = true;
}

const isGameStarted = () => gameStarted;
const isGameOver = () => gameOver;

const getMillisecondPerMovement = () => MILLISECOND_PER_MOVEMENT;
const setMillisecondPerMovement = (val) => {
    MILLISECOND_PER_MOVEMENT = val;
};

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "composeFrame": () => (/* binding */ composeFrame),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "updateGameModels": () => (/* binding */ updateGameModels)
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food */ "./src/food.js");
/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./snake */ "./src/snake.js");
/* harmony import */ var _coordinate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./coordinate */ "./src/coordinate.js");
/* harmony import */ var _global_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global_data */ "./src/global_data.js");






const board = document.querySelector(".board");
const snake = new _snake__WEBPACK_IMPORTED_MODULE_2__.Snake();
const food = new _food__WEBPACK_IMPORTED_MODULE_1__.Food();
let delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(0, 1);

const LEFT_KEY = "ArrowLeft";
const RIGHT_KEY = "ArrowRight";
const UP_KEY = "ArrowUp";
const DOWN_KEY = "ArrowDown";
let moved;

let touchXstart, touchXend;
let touchYstart, touchYend;

function init()
{
  _board__WEBPACK_IMPORTED_MODULE_0__.Board.drawBoard(board);
  _board__WEBPACK_IMPORTED_MODULE_0__.Board.drawFood(food);
  _board__WEBPACK_IMPORTED_MODULE_0__.Board.drawSnake(snake);

  // KEYBOARD CONTROLS
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (moved === false) return; // IF THE SNAKE HASN'T MOVED, DON'T TAKE A NEW INPUT
    if (key === LEFT_KEY && delta_coordinate.x !== 1)
    {
      delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(-1, 0);
    }
    if (key === UP_KEY && delta_coordinate.y !== 1)
    {
      delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(0, -1);
    }
    if (key === DOWN_KEY && delta_coordinate.y !== -1)
    {
      delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(0, 1);
    }
    if (key === RIGHT_KEY && delta_coordinate.x !== -1)
    {
      delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(1, 0);
    }
    moved = false;
  });

  // TOUCHSCREEN CONTROLS
  document.addEventListener('touchstart', (e) => {
    touchXstart = e.changedTouches[0].screenX;
    touchYstart = e.changedTouches[0].screenY;
  });

  document.addEventListener('touchmove', (e) => {
    touchXend = e.changedTouches[0].screenX;
    touchYend = e.changedTouches[0].screenY;

    const xDiff = touchXend - touchXstart;
    const yDiff = touchYend - touchYstart;

    if (Math.sqrt(xDiff * xDiff + yDiff * yDiff) < 22 || !(0,_global_data__WEBPACK_IMPORTED_MODULE_4__.isGameStarted)()) return;

    touchXstart = touchXend;
    touchYstart = touchYend;

    let swipeAngle = ((Math.atan2(yDiff, xDiff) / Math.PI) * 180 + 360) % 360;
    if (swipeAngle >= 45 && swipeAngle < 135 && delta_coordinate.y !== -1)
    {
      delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(0, 1);
    }
    else if (swipeAngle >= 135 && swipeAngle < 225 && delta_coordinate.x !== 1)
    {
      delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(-1, 0)
    }
    else if (swipeAngle >=225 && swipeAngle < 315 && delta_coordinate.y !== 1)
    {
      delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(0, -1);
    }
    else if (swipeAngle >= 315 || swipeAngle < 45)
    {
      if (delta_coordinate.x !== -1)
      {
        delta_coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_3__.Coordinate(1, 0);
      }
    }
  });
}

function updateGameModels()
{
  if (food.isEaten(snake.getHeadCoordinate())) { // RESPAWN FOOD AT A PLACE NOT WHERE SNAKE IS
    snake.grow();

    do {
      food.respawn();
    } while (snake.checkForCollision(food.getCoordinate()) || food.isEaten(snake.getHeadCoordinate()));

    const currentMillisecondPerMovement = (0,_global_data__WEBPACK_IMPORTED_MODULE_4__.getMillisecondPerMovement)();
    if (currentMillisecondPerMovement > 50)
    {
      (0,_global_data__WEBPACK_IMPORTED_MODULE_4__.setMillisecondPerMovement)(currentMillisecondPerMovement - 5);
    }
  }
  
  snake.move(delta_coordinate);
  moved = true;
  if (snake.isAtBoundary() || snake.checkForCollision(snake.getHeadCoordinate())) {
    (0,_global_data__WEBPACK_IMPORTED_MODULE_4__.setGameOver)();
  }
}

function composeFrame()
{
  try {
    _board__WEBPACK_IMPORTED_MODULE_0__.Board.clearBoard(board);
    _board__WEBPACK_IMPORTED_MODULE_0__.Board.drawFood(food);
    _board__WEBPACK_IMPORTED_MODULE_0__.Board.drawSnake(snake);
  }
  catch (err)
  {
    console.log(err.message);
  }  
}


/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Snake": () => (/* binding */ Snake)
/* harmony export */ });
/* harmony import */ var _coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinate */ "./src/coordinate.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./src/board.js");



class Snake {
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

        for (let i = this.segments.length - 1; i > 0; --i)
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
        if (!_coordinate__WEBPACK_IMPORTED_MODULE_0__.Coordinate.isCoordinate(coord))
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
        return (snakeHead.x >= _board__WEBPACK_IMPORTED_MODULE_1__.Board.CELL_PER_WIDTH ||
                snakeHead.y >= _board__WEBPACK_IMPORTED_MODULE_1__.Board.CELL_PER_HEIGHT ||
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
        this.#coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_0__.Coordinate(x, y);
    }

    follow(segment)
    {
        const isSegment = segment instanceof Segment;
        if (!isSegment)
        {
            throw new Error("Argument passed is not an instance of class - Segment");
        }
        let segmentCoord = segment.getCoordinate();
        
        this.#coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_0__.Coordinate(segmentCoord.x, segmentCoord.y);
    }

    setCoordinate(coord)
    {
        if (!_coordinate__WEBPACK_IMPORTED_MODULE_0__.Coordinate.isCoordinate(coord))
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
        if (!_coordinate__WEBPACK_IMPORTED_MODULE_0__.Coordinate.isCoordinate(delta_coord))
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global_data */ "./src/global_data.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ "./src/logic.js");



const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
    if (!(0,_global_data__WEBPACK_IMPORTED_MODULE_0__.isGameStarted)())
    {
        playBtn.setAttribute('disabled', 'true');
        (0,_global_data__WEBPACK_IMPORTED_MODULE_0__.startGame)();
        try {
            window.requestAnimationFrame(main);
        }
        catch (error) {
            console.log(error.message);
        }
    }
});

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    location.reload(); 
});

(0,_logic__WEBPACK_IMPORTED_MODULE_1__.init)();

let start;

function main(timestamp) {
    if ((0,_global_data__WEBPACK_IMPORTED_MODULE_0__.isGameOver)()) return;
    if (start === undefined)
    {
        start = timestamp;
    }

    let elapsedTime = timestamp - start;

    if (elapsedTime >= (0,_global_data__WEBPACK_IMPORTED_MODULE_0__.getMillisecondPerMovement)())
    {
        (0,_logic__WEBPACK_IMPORTED_MODULE_1__.composeFrame)();
        (0,_logic__WEBPACK_IMPORTED_MODULE_1__.updateGameModels)();
        start = timestamp;
    }
    window.requestAnimationFrame(main);
}


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnRUFBdUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNySEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOZ0c7QUFDakM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsU0FBUywyREFBYTtBQUN0QjtBQUNBO0FBQ0EsUUFBUSx1REFBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDRDQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFVO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVFQUF5QjtBQUNoRDtBQUNBLFFBQVEsb0RBQVk7QUFDcEIsUUFBUSx3REFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9jb29yZGluYXRlLmpzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvZm9vZC5qcyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL2dsb2JhbF9kYXRhLmpzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9zbmFrZS5qcyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb29kIH0gZnJvbSBcIi4vZm9vZFwiO1xyXG5pbXBvcnQgeyBTbmFrZSB9IGZyb20gXCIuL3NuYWtlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9hcmQge1xyXG4gICAgc3RhdGljIENFTExfRElNRU5TSU9OID0gMjA7XHJcbiAgICBzdGF0aWMgQ0VMTF9QRVJfV0lEVEggPSAyMDtcclxuICAgIHN0YXRpYyBDRUxMX1BFUl9IRUlHSFQgPSAyMDtcclxuXHJcbiAgICBzdGF0aWMgZHJhd0JvYXJkKGNvbnRhaW5lcilcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuQ0VMTF9QRVJfSEVJR0hUOyArK3kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuQ0VMTF9QRVJfV0lEVEg7ICsreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gYGNlbGwgY29vcmQtJHt4fS0ke3l9YDtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2xlYXJCb2FyZChjb250YWluZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiZm9vZFwiKTtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwic2VnbWVudFwiKTtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGVhZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZHJhd1NuYWtlKHNuYWtlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghU25ha2UuaXNTbmFrZShzbmFrZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIFNuYWtlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc25ha2VTZWdtZW50cyA9IHNuYWtlLnNlZ21lbnRzO1xyXG4gICAgICAgIHNuYWtlU2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3U2VnbWVudChzZWdtZW50LCBpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRyYXdTZWdtZW50KHNlZ21lbnQsIGluZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb29yZCA9IHNlZ21lbnQuZ2V0Q29vcmRpbmF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29vcmQtJHtjb29yZC54fS0ke2Nvb3JkLnl9YCk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwic2VnbWVudFwiKTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC50b2dnbGUoXCJoZWFkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZHJhd0Zvb2QoZm9vZClcclxuICAgIHtcclxuICAgICAgICBpZiAoIUZvb2QuaXNGb29kKGZvb2QpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJnbXVlbnQgcGFzc2VkIGlzIG5vdCBhIHZhbGlkIGluc3RhbmNlIG9mIGNsYXNzIC0gRm9vZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvb3JkID0gZm9vZC5nZXRDb29yZGluYXRlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29vcmQtJHtjb29yZC54fS0ke2Nvb3JkLnl9YCk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwiZm9vZFwiKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb29yZGluYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChjb29yZGluYXRlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGlzQ29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUgaW5zdGFuY2VvZiBDb29yZGluYXRlO1xyXG4gICAgICAgIGlmICghaXNDb29yZGluYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIENvb3JkaW5hdGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMueCArPSBjb29yZGluYXRlLng7XHJcbiAgICAgICAgdGhpcy55ICs9IGNvb3JkaW5hdGUueTtcclxuICAgIH1cclxuXHJcbiAgICBlcXVhbChjb29yZGluYXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghY29vcmRpbmF0ZSBpbnN0YW5jZW9mIENvb3JkaW5hdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnggPT09IGNvb3JkaW5hdGUueCAmJiB0aGlzLnkgPT09IGNvb3JkaW5hdGUueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzQ29vcmRpbmF0ZShvYmopXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIENvb3JkaW5hdGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL2JvYXJkXCI7XHJcbmltcG9ydCB7IENvb3JkaW5hdGUgfSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9vZCB7XHJcbiAgICAjY29vcmRpbmF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KVxyXG4gICAge1xyXG4gICAgICAgIGlmICh4ICE9PSB1bmRlZmluZWQgJiYgeSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy4jY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKHgsIHkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNwYXduKCk7XHJcbiAgICAgICAgfSB3aGlsZSAodGhpcy4jY29vcmRpbmF0ZS54ID09PSAxMCAmJiB0aGlzLiNjb29yZGluYXRlLnkgPD0gMik7XHJcbiAgICB9XHJcblxyXG4gICAgI2dldFJhbmRvbUFyYml0cmFyeShtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzcGF3bigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLiNnZXRSYW5kb21BcmJpdHJhcnkoMCwgQm9hcmQuQ0VMTF9QRVJfV0lEVEggLSAxKTtcclxuICAgICAgICBsZXQgeSA9IHRoaXMuI2dldFJhbmRvbUFyYml0cmFyeSgwLCBCb2FyZC5DRUxMX1BFUl9IRUlHSFQgLSAxKTtcclxuICAgICAgICB0aGlzLiNjb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcmRpbmF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2Nvb3JkaW5hdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFYXRlbihjb29yZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuI2Nvb3JkaW5hdGUuZXF1YWwoY29vcmQpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNGb29kKG9iailcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRm9vZDtcclxuICAgIH1cclxufSIsImxldCBnYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG5sZXQgZ2FtZU92ZXIgPSBmYWxzZTtcclxubGV0IE1JTExJU0VDT05EX1BFUl9NT1ZFTUVOVCA9IDEwMDtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRHYW1lT3ZlciA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLW92ZXJcIikuY2xhc3NMaXN0LnRvZ2dsZShcInRydWVcIik7XHJcbiAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgZ2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNHYW1lU3RhcnRlZCA9ICgpID0+IGdhbWVTdGFydGVkO1xyXG5leHBvcnQgY29uc3QgaXNHYW1lT3ZlciA9ICgpID0+IGdhbWVPdmVyO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE1pbGxpc2Vjb25kUGVyTW92ZW1lbnQgPSAoKSA9PiBNSUxMSVNFQ09ORF9QRVJfTU9WRU1FTlQ7XHJcbmV4cG9ydCBjb25zdCBzZXRNaWxsaXNlY29uZFBlck1vdmVtZW50ID0gKHZhbCkgPT4ge1xyXG4gICAgTUlMTElTRUNPTkRfUEVSX01PVkVNRU5UID0gdmFsO1xyXG59OyIsImltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vYm9hcmRcIjtcclxuaW1wb3J0IHsgRm9vZCB9IGZyb20gXCIuL2Zvb2RcIjtcclxuaW1wb3J0IHsgU25ha2UgfSBmcm9tIFwiLi9zbmFrZVwiO1xyXG5pbXBvcnQgeyBDb29yZGluYXRlIH0gZnJvbSBcIi4vY29vcmRpbmF0ZVwiO1xyXG5pbXBvcnQgeyBnZXRNaWxsaXNlY29uZFBlck1vdmVtZW50LCBzZXRNaWxsaXNlY29uZFBlck1vdmVtZW50LCBzZXRHYW1lT3ZlciwgaXNHYW1lU3RhcnRlZCB9IGZyb20gXCIuL2dsb2JhbF9kYXRhXCI7XHJcblxyXG5jb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRcIik7XHJcbmNvbnN0IHNuYWtlID0gbmV3IFNuYWtlKCk7XHJcbmNvbnN0IGZvb2QgPSBuZXcgRm9vZCgpO1xyXG5sZXQgZGVsdGFfY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKDAsIDEpO1xyXG5cclxuY29uc3QgTEVGVF9LRVkgPSBcIkFycm93TGVmdFwiO1xyXG5jb25zdCBSSUdIVF9LRVkgPSBcIkFycm93UmlnaHRcIjtcclxuY29uc3QgVVBfS0VZID0gXCJBcnJvd1VwXCI7XHJcbmNvbnN0IERPV05fS0VZID0gXCJBcnJvd0Rvd25cIjtcclxubGV0IG1vdmVkO1xyXG5cclxubGV0IHRvdWNoWHN0YXJ0LCB0b3VjaFhlbmQ7XHJcbmxldCB0b3VjaFlzdGFydCwgdG91Y2hZZW5kO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKVxyXG57XHJcbiAgQm9hcmQuZHJhd0JvYXJkKGJvYXJkKTtcclxuICBCb2FyZC5kcmF3Rm9vZChmb29kKTtcclxuICBCb2FyZC5kcmF3U25ha2Uoc25ha2UpO1xyXG5cclxuICAvLyBLRVlCT0FSRCBDT05UUk9MU1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcclxuICAgIFxyXG4gICAgaWYgKG1vdmVkID09PSBmYWxzZSkgcmV0dXJuOyAvLyBJRiBUSEUgU05BS0UgSEFTTidUIE1PVkVELCBET04nVCBUQUtFIEEgTkVXIElOUFVUXHJcbiAgICBpZiAoa2V5ID09PSBMRUZUX0tFWSAmJiBkZWx0YV9jb29yZGluYXRlLnggIT09IDEpXHJcbiAgICB7XHJcbiAgICAgIGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgtMSwgMCk7XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5ID09PSBVUF9LRVkgJiYgZGVsdGFfY29vcmRpbmF0ZS55ICE9PSAxKVxyXG4gICAge1xyXG4gICAgICBkZWx0YV9jb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoMCwgLTEpO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PT0gRE9XTl9LRVkgJiYgZGVsdGFfY29vcmRpbmF0ZS55ICE9PSAtMSlcclxuICAgIHtcclxuICAgICAgZGVsdGFfY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKDAsIDEpO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PT0gUklHSFRfS0VZICYmIGRlbHRhX2Nvb3JkaW5hdGUueCAhPT0gLTEpXHJcbiAgICB7XHJcbiAgICAgIGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgxLCAwKTtcclxuICAgIH1cclxuICAgIG1vdmVkID0gZmFsc2U7XHJcbiAgfSk7XHJcblxyXG4gIC8vIFRPVUNIU0NSRUVOIENPTlRST0xTXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XHJcbiAgICB0b3VjaFhzdGFydCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcclxuICAgIHRvdWNoWXN0YXJ0ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xyXG4gIH0pO1xyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xyXG4gICAgdG91Y2hYZW5kID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xyXG4gICAgdG91Y2hZZW5kID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZO1xyXG5cclxuICAgIGNvbnN0IHhEaWZmID0gdG91Y2hYZW5kIC0gdG91Y2hYc3RhcnQ7XHJcbiAgICBjb25zdCB5RGlmZiA9IHRvdWNoWWVuZCAtIHRvdWNoWXN0YXJ0O1xyXG5cclxuICAgIGlmIChNYXRoLnNxcnQoeERpZmYgKiB4RGlmZiArIHlEaWZmICogeURpZmYpIDwgMjIgfHwgIWlzR2FtZVN0YXJ0ZWQoKSkgcmV0dXJuO1xyXG5cclxuICAgIHRvdWNoWHN0YXJ0ID0gdG91Y2hYZW5kO1xyXG4gICAgdG91Y2hZc3RhcnQgPSB0b3VjaFllbmQ7XHJcblxyXG4gICAgbGV0IHN3aXBlQW5nbGUgPSAoKE1hdGguYXRhbjIoeURpZmYsIHhEaWZmKSAvIE1hdGguUEkpICogMTgwICsgMzYwKSAlIDM2MDtcclxuICAgIGlmIChzd2lwZUFuZ2xlID49IDQ1ICYmIHN3aXBlQW5nbGUgPCAxMzUgJiYgZGVsdGFfY29vcmRpbmF0ZS55ICE9PSAtMSlcclxuICAgIHtcclxuICAgICAgZGVsdGFfY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKDAsIDEpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3dpcGVBbmdsZSA+PSAxMzUgJiYgc3dpcGVBbmdsZSA8IDIyNSAmJiBkZWx0YV9jb29yZGluYXRlLnggIT09IDEpXHJcbiAgICB7XHJcbiAgICAgIGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgtMSwgMClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHN3aXBlQW5nbGUgPj0yMjUgJiYgc3dpcGVBbmdsZSA8IDMxNSAmJiBkZWx0YV9jb29yZGluYXRlLnkgIT09IDEpXHJcbiAgICB7XHJcbiAgICAgIGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgwLCAtMSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzd2lwZUFuZ2xlID49IDMxNSB8fCBzd2lwZUFuZ2xlIDwgNDUpXHJcbiAgICB7XHJcbiAgICAgIGlmIChkZWx0YV9jb29yZGluYXRlLnggIT09IC0xKVxyXG4gICAgICB7XHJcbiAgICAgICAgZGVsdGFfY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKDEsIDApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVHYW1lTW9kZWxzKClcclxue1xyXG4gIGlmIChmb29kLmlzRWF0ZW4oc25ha2UuZ2V0SGVhZENvb3JkaW5hdGUoKSkpIHsgLy8gUkVTUEFXTiBGT09EIEFUIEEgUExBQ0UgTk9UIFdIRVJFIFNOQUtFIElTXHJcbiAgICBzbmFrZS5ncm93KCk7XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICBmb29kLnJlc3Bhd24oKTtcclxuICAgIH0gd2hpbGUgKHNuYWtlLmNoZWNrRm9yQ29sbGlzaW9uKGZvb2QuZ2V0Q29vcmRpbmF0ZSgpKSB8fCBmb29kLmlzRWF0ZW4oc25ha2UuZ2V0SGVhZENvb3JkaW5hdGUoKSkpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRNaWxsaXNlY29uZFBlck1vdmVtZW50ID0gZ2V0TWlsbGlzZWNvbmRQZXJNb3ZlbWVudCgpO1xyXG4gICAgaWYgKGN1cnJlbnRNaWxsaXNlY29uZFBlck1vdmVtZW50ID4gNTApXHJcbiAgICB7XHJcbiAgICAgIHNldE1pbGxpc2Vjb25kUGVyTW92ZW1lbnQoY3VycmVudE1pbGxpc2Vjb25kUGVyTW92ZW1lbnQgLSA1KTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgc25ha2UubW92ZShkZWx0YV9jb29yZGluYXRlKTtcclxuICBtb3ZlZCA9IHRydWU7XHJcbiAgaWYgKHNuYWtlLmlzQXRCb3VuZGFyeSgpIHx8IHNuYWtlLmNoZWNrRm9yQ29sbGlzaW9uKHNuYWtlLmdldEhlYWRDb29yZGluYXRlKCkpKSB7XHJcbiAgICBzZXRHYW1lT3ZlcigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VGcmFtZSgpXHJcbntcclxuICB0cnkge1xyXG4gICAgQm9hcmQuY2xlYXJCb2FyZChib2FyZCk7XHJcbiAgICBCb2FyZC5kcmF3Rm9vZChmb29kKTtcclxuICAgIEJvYXJkLmRyYXdTbmFrZShzbmFrZSk7XHJcbiAgfVxyXG4gIGNhdGNoIChlcnIpXHJcbiAge1xyXG4gICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gIH0gIFxyXG59XHJcbiIsImltcG9ydCB7IENvb3JkaW5hdGUgfSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XHJcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTbmFrZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc25ha2VIZWFkID0gbmV3IFNlZ21lbnQoMTAsIDIpO1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbc25ha2VIZWFkLCBuZXcgU2VnbWVudCgxMCwgMSksIG5ldyBTZWdtZW50KDEwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShkZWx0YV9jb29yZClcclxuICAgIHtcclxuICAgICAgICBpZiAoKE1hdGguYWJzKGRlbHRhX2Nvb3JkLngpICsgTWF0aC5hYnMoZGVsdGFfY29vcmQueSkpICE9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjb29yZGluYXRlLCBzdW0gb2YgY29vcmRpbmF0ZSBtdXN0IGJlIDFcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDE7IGkgPiAwOyAtLWkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNlZ21lbnRzW2ldLmZvbGxvdyh0aGlzLnNlZ21lbnRzW2ktMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlZ21lbnRzWzBdLm1vdmUoZGVsdGFfY29vcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdyb3coKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG5ld1NlZ21lbnQgPSBuZXcgU2VnbWVudCgwLCAwKTtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzLnB1c2gobmV3U2VnbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JDb2xsaXNpb24oY29vcmQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFDb29yZGluYXRlLmlzQ29vcmRpbmF0ZShjb29yZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5zZWdtZW50cy5sZW5ndGg7ICsraSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRDb29yZCA9IHRoaXMuc2VnbWVudHNbaV0uZ2V0Q29vcmRpbmF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudENvb3JkLmVxdWFsKGNvb3JkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlYWRDb29yZGluYXRlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWdtZW50c1swXS5nZXRDb29yZGluYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBdEJvdW5kYXJ5KClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzbmFrZUhlYWQgPSB0aGlzLmdldEhlYWRDb29yZGluYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIChzbmFrZUhlYWQueCA+PSBCb2FyZC5DRUxMX1BFUl9XSURUSCB8fFxyXG4gICAgICAgICAgICAgICAgc25ha2VIZWFkLnkgPj0gQm9hcmQuQ0VMTF9QRVJfSEVJR0hUIHx8XHJcbiAgICAgICAgICAgICAgICBzbmFrZUhlYWQueCA8IDAgfHwgc25ha2VIZWFkLnkgPCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNTbmFrZShvYmopXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIFNuYWtlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgU2VnbWVudCB7XHJcbiAgICAjY29vcmRpbmF0ZTtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy4jY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvbGxvdyhzZWdtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGlzU2VnbWVudCA9IHNlZ21lbnQgaW5zdGFuY2VvZiBTZWdtZW50O1xyXG4gICAgICAgIGlmICghaXNTZWdtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIFNlZ21lbnRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWdtZW50Q29vcmQgPSBzZWdtZW50LmdldENvb3JkaW5hdGUoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLiNjb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoc2VnbWVudENvb3JkLngsIHNlZ21lbnRDb29yZC55KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb29yZGluYXRlKGNvb3JkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghQ29vcmRpbmF0ZS5pc0Nvb3JkaW5hdGUoY29vcmQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIENvb3JkaW5hdGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiNjb29yZGluYXRlID0gY29vcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcmRpbmF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2Nvb3JkaW5hdGU7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShkZWx0YV9jb29yZClcclxuICAgIHtcclxuICAgICAgICBpZiAoIUNvb3JkaW5hdGUuaXNDb29yZGluYXRlKGRlbHRhX2Nvb3JkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgY2xhc3MgLSBDb29yZGluYXRlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChNYXRoLmFicyhkZWx0YV9jb29yZC54KSArIE1hdGguYWJzKGRlbHRhX2Nvb3JkLnkpKSA9PT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuI2Nvb3JkaW5hdGUuYWRkKGRlbHRhX2Nvb3JkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYSB2YWxpZCBkZWx0YSBjb29yZGluYXRlXCIpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpc0dhbWVPdmVyLCBpc0dhbWVTdGFydGVkLCBnZXRNaWxsaXNlY29uZFBlck1vdmVtZW50LCBzdGFydEdhbWUgfSBmcm9tIFwiLi9nbG9iYWxfZGF0YVwiO1xyXG5pbXBvcnQgeyBjb21wb3NlRnJhbWUsIGluaXQsIHVwZGF0ZUdhbWVNb2RlbHMgfSBmcm9tIFwiLi9sb2dpY1wiO1xyXG5cclxuY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ0bicpO1xyXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgaWYgKCFpc0dhbWVTdGFydGVkKCkpXHJcbiAgICB7XHJcbiAgICAgICAgcGxheUJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ3RydWUnKTtcclxuICAgICAgICBzdGFydEdhbWUoKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0LWJ0bicpO1xyXG5yZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGxvY2F0aW9uLnJlbG9hZCgpOyBcclxufSk7XHJcblxyXG5pbml0KCk7XHJcblxyXG5sZXQgc3RhcnQ7XHJcblxyXG5mdW5jdGlvbiBtYWluKHRpbWVzdGFtcCkge1xyXG4gICAgaWYgKGlzR2FtZU92ZXIoKSkgcmV0dXJuO1xyXG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgc3RhcnQgPSB0aW1lc3RhbXA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGVsYXBzZWRUaW1lID0gdGltZXN0YW1wIC0gc3RhcnQ7XHJcblxyXG4gICAgaWYgKGVsYXBzZWRUaW1lID49IGdldE1pbGxpc2Vjb25kUGVyTW92ZW1lbnQoKSlcclxuICAgIHtcclxuICAgICAgICBjb21wb3NlRnJhbWUoKTtcclxuICAgICAgICB1cGRhdGVHYW1lTW9kZWxzKCk7XHJcbiAgICAgICAgc3RhcnQgPSB0aW1lc3RhbXA7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xyXG59XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=