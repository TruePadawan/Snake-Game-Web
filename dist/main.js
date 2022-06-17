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
/* harmony export */   "setHighScore": () => (/* binding */ setHighScore),
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

function setHighScore(score)
{
    window.localStorage.setItem("high-score", new String(score));
    document.querySelector(".high-score > .score").textContent = score;
}

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
let score = 0;

const LEFT_KEY = "ArrowLeft";
const RIGHT_KEY = "ArrowRight";
const UP_KEY = "ArrowUp";
const DOWN_KEY = "ArrowDown";
let moved;

let touchXstart, touchXend;
let touchYstart, touchYend;

const foodEatedSound = new Audio("./sounds/snake-eat.wav");
const gameOverSound = new Audio("./sounds/game-over.wav");

function increaseScore()
{
  ++score;
  const highScore = window.localStorage.getItem("high-score");
  if (score > +highScore)
  {
    (0,_global_data__WEBPACK_IMPORTED_MODULE_4__.setHighScore)(score);
  }
  document.querySelector(".current-score > .score").textContent = score;
}
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

  const highScore = window.localStorage.getItem("high-score");
  if (highScore === null)
  {
    window.localStorage.setItem("high-score", "0");
  }
  else {
    document.querySelector(".high-score > .score").textContent = highScore;
  }
}

function updateGameModels()
{
  if (food.isEaten(snake.getHeadCoordinate())) { // RESPAWN FOOD AT A PLACE NOT WHERE SNAKE IS
    snake.grow();
    foodEatedSound.play();
    increaseScore();

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
    gameOverSound.play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ0U7QUFDaEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwQkFBMEI7QUFDbEQ7QUFDQSw0QkFBNEIseUJBQXlCO0FBQ3JEO0FBQ0E7QUFDQSwrQ0FBK0MsRUFBRSxHQUFHLEVBQUU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsaURBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxRQUFRLEdBQUcsUUFBUTtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDhDQUFXO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxRQUFRLEdBQUcsUUFBUTtBQUN6RTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQmdDO0FBQ1U7QUFDMUM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtREFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsd0RBQW9CO0FBQ2hFLDRDQUE0Qyx5REFBcUI7QUFDakUsK0JBQStCLG1EQUFVO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ1A7QUFDTztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JnQztBQUNGO0FBQ0U7QUFDVTtBQUNxRjtBQUMvSDtBQUNBO0FBQ0Esa0JBQWtCLHlDQUFLO0FBQ3ZCLGlCQUFpQix1Q0FBSTtBQUNyQiwyQkFBMkIsbURBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksMERBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLEVBQUUsbURBQWU7QUFDakIsRUFBRSxrREFBYztBQUNoQixFQUFFLG1EQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLDZCQUE2QixtREFBVTtBQUN2QztBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsbURBQVU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG1EQUFVO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixtREFBVTtBQUN2QztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCwyREFBYTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixtREFBVTtBQUN2QztBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsbURBQVU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG1EQUFVO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQVU7QUFDekM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSwwQ0FBMEMsdUVBQXlCO0FBQ25FO0FBQ0E7QUFDQSxNQUFNLHVFQUF5QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFXO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxJQUFJLG9EQUFnQjtBQUNwQixJQUFJLGtEQUFjO0FBQ2xCLElBQUksbURBQWU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKMEM7QUFDVjtBQUNoQztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsT0FBTztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnRUFBdUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwQkFBMEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHdEQUFvQjtBQUNuRCwrQkFBK0IseURBQXFCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQVU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBVTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0VBQXVCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdFQUF1QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ3JIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05nRztBQUNqQztBQUMvRDtBQUNBO0FBQ0E7QUFDQSxTQUFTLDJEQUFhO0FBQ3RCO0FBQ0E7QUFDQSxRQUFRLHVEQUFTO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsNENBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0RBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdUVBQXlCO0FBQ2hEO0FBQ0EsUUFBUSxvREFBWTtBQUNwQixRQUFRLHdEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9ib2FyZC5qcyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL2Nvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9mb29kLmpzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvZ2xvYmFsX2RhdGEuanMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL3NuYWtlLmpzIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvb2QgfSBmcm9tIFwiLi9mb29kXCI7XHJcbmltcG9ydCB7IFNuYWtlIH0gZnJvbSBcIi4vc25ha2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZCB7XHJcbiAgICBzdGF0aWMgQ0VMTF9ESU1FTlNJT04gPSAyMDtcclxuICAgIHN0YXRpYyBDRUxMX1BFUl9XSURUSCA9IDIwO1xyXG4gICAgc3RhdGljIENFTExfUEVSX0hFSUdIVCA9IDIwO1xyXG5cclxuICAgIHN0YXRpYyBkcmF3Qm9hcmQoY29udGFpbmVyKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5DRUxMX1BFUl9IRUlHSFQ7ICsreSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5DRUxMX1BFUl9XSURUSDsgKyt4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSBgY2VsbCBjb29yZC0ke3h9LSR7eX1gO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbGVhckJvYXJkKGNvbnRhaW5lcilcclxuICAgIHtcclxuICAgICAgICBjb250YWluZXIuY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJmb29kXCIpO1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWdtZW50XCIpO1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkcmF3U25ha2Uoc25ha2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFTbmFrZS5pc1NuYWtlKHNuYWtlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9iamVjdCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gU25ha2VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzbmFrZVNlZ21lbnRzID0gc25ha2Uuc2VnbWVudHM7XHJcbiAgICAgICAgc25ha2VTZWdtZW50cy5mb3JFYWNoKChzZWdtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdTZWdtZW50KHNlZ21lbnQsIGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZHJhd1NlZ21lbnQoc2VnbWVudCwgaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNvb3JkID0gc2VnbWVudC5nZXRDb29yZGluYXRlKCk7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb29yZC0ke2Nvb3JkLnh9LSR7Y29vcmQueX1gKTtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC50b2dnbGUoXCJzZWdtZW50XCIpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnRvZ2dsZShcImhlYWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkcmF3Rm9vZChmb29kKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghRm9vZC5pc0Zvb2QoZm9vZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmdtdWVudCBwYXNzZWQgaXMgbm90IGEgdmFsaWQgaW5zdGFuY2Ugb2YgY2xhc3MgLSBGb29kXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29vcmQgPSBmb29kLmdldENvb3JkaW5hdGUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb29yZC0ke2Nvb3JkLnh9LSR7Y29vcmQueX1gKTtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC50b2dnbGUoXCJmb29kXCIpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIENvb3JkaW5hdGUge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGNvb3JkaW5hdGUpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgaXNDb29yZGluYXRlID0gY29vcmRpbmF0ZSBpbnN0YW5jZW9mIENvb3JkaW5hdGU7XHJcbiAgICAgICAgaWYgKCFpc0Nvb3JkaW5hdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy54ICs9IGNvb3JkaW5hdGUueDtcclxuICAgICAgICB0aGlzLnkgKz0gY29vcmRpbmF0ZS55O1xyXG4gICAgfVxyXG5cclxuICAgIGVxdWFsKGNvb3JkaW5hdGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFjb29yZGluYXRlIGluc3RhbmNlb2YgQ29vcmRpbmF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgY2xhc3MgLSBDb29yZGluYXRlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHRoaXMueCA9PT0gY29vcmRpbmF0ZS54ICYmIHRoaXMueSA9PT0gY29vcmRpbmF0ZS55KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNDb29yZGluYXRlKG9iailcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgQ29vcmRpbmF0ZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vYm9hcmRcIjtcclxuaW1wb3J0IHsgQ29vcmRpbmF0ZSB9IGZyb20gXCIuL2Nvb3JkaW5hdGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb29kIHtcclxuICAgICNjb29yZGluYXRlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHggIT09IHVuZGVmaW5lZCAmJiB5ICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLiNjb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoeCwgeSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3Bhd24oKTtcclxuICAgICAgICB9IHdoaWxlICh0aGlzLiNjb29yZGluYXRlLnggPT09IDEwICYmIHRoaXMuI2Nvb3JkaW5hdGUueSA8PSAyKTtcclxuICAgIH1cclxuXHJcbiAgICAjZ2V0UmFuZG9tQXJiaXRyYXJ5KG1pbiwgbWF4KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNwYXduKClcclxuICAgIHtcclxuICAgICAgICBsZXQgeCA9IHRoaXMuI2dldFJhbmRvbUFyYml0cmFyeSgwLCBCb2FyZC5DRUxMX1BFUl9XSURUSCAtIDEpO1xyXG4gICAgICAgIGxldCB5ID0gdGhpcy4jZ2V0UmFuZG9tQXJiaXRyYXJ5KDAsIEJvYXJkLkNFTExfUEVSX0hFSUdIVCAtIDEpO1xyXG4gICAgICAgIHRoaXMuI2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSh4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb29yZGluYXRlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jY29vcmRpbmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VhdGVuKGNvb3JkKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAodGhpcy4jY29vcmRpbmF0ZS5lcXVhbChjb29yZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc0Zvb2Qob2JqKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBGb29kO1xyXG4gICAgfVxyXG59IiwibGV0IGdhbWVTdGFydGVkID0gZmFsc2U7XHJcbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xyXG5sZXQgTUlMTElTRUNPTkRfUEVSX01PVkVNRU5UID0gMTAwO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldEdhbWVPdmVyID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICBnYW1lT3ZlciA9IHRydWU7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtb3ZlclwiKS5jbGFzc0xpc3QudG9nZ2xlKFwidHJ1ZVwiKTtcclxuICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XHJcbiAgICBnYW1lU3RhcnRlZCA9IHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc0dhbWVTdGFydGVkID0gKCkgPT4gZ2FtZVN0YXJ0ZWQ7XHJcbmV4cG9ydCBjb25zdCBpc0dhbWVPdmVyID0gKCkgPT4gZ2FtZU92ZXI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TWlsbGlzZWNvbmRQZXJNb3ZlbWVudCA9ICgpID0+IE1JTExJU0VDT05EX1BFUl9NT1ZFTUVOVDtcclxuZXhwb3J0IGNvbnN0IHNldE1pbGxpc2Vjb25kUGVyTW92ZW1lbnQgPSAodmFsKSA9PiB7XHJcbiAgICBNSUxMSVNFQ09ORF9QRVJfTU9WRU1FTlQgPSB2YWw7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SGlnaFNjb3JlKHNjb3JlKVxyXG57XHJcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoaWdoLXNjb3JlXCIsIG5ldyBTdHJpbmcoc2NvcmUpKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGlnaC1zY29yZSA+IC5zY29yZVwiKS50ZXh0Q29udGVudCA9IHNjb3JlO1xyXG59IiwiaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi9ib2FyZFwiO1xyXG5pbXBvcnQgeyBGb29kIH0gZnJvbSBcIi4vZm9vZFwiO1xyXG5pbXBvcnQgeyBTbmFrZSB9IGZyb20gXCIuL3NuYWtlXCI7XHJcbmltcG9ydCB7IENvb3JkaW5hdGUgfSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XHJcbmltcG9ydCB7IHNldEhpZ2hTY29yZSwgZ2V0TWlsbGlzZWNvbmRQZXJNb3ZlbWVudCwgc2V0TWlsbGlzZWNvbmRQZXJNb3ZlbWVudCwgc2V0R2FtZU92ZXIsIGlzR2FtZVN0YXJ0ZWQgfSBmcm9tIFwiLi9nbG9iYWxfZGF0YVwiO1xyXG5cclxuY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkXCIpO1xyXG5jb25zdCBzbmFrZSA9IG5ldyBTbmFrZSgpO1xyXG5jb25zdCBmb29kID0gbmV3IEZvb2QoKTtcclxubGV0IGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgwLCAxKTtcclxubGV0IHNjb3JlID0gMDtcclxuXHJcbmNvbnN0IExFRlRfS0VZID0gXCJBcnJvd0xlZnRcIjtcclxuY29uc3QgUklHSFRfS0VZID0gXCJBcnJvd1JpZ2h0XCI7XHJcbmNvbnN0IFVQX0tFWSA9IFwiQXJyb3dVcFwiO1xyXG5jb25zdCBET1dOX0tFWSA9IFwiQXJyb3dEb3duXCI7XHJcbmxldCBtb3ZlZDtcclxuXHJcbmxldCB0b3VjaFhzdGFydCwgdG91Y2hYZW5kO1xyXG5sZXQgdG91Y2hZc3RhcnQsIHRvdWNoWWVuZDtcclxuXHJcbmNvbnN0IGZvb2RFYXRlZFNvdW5kID0gbmV3IEF1ZGlvKFwiLi9zb3VuZHMvc25ha2UtZWF0LndhdlwiKTtcclxuY29uc3QgZ2FtZU92ZXJTb3VuZCA9IG5ldyBBdWRpbyhcIi4vc291bmRzL2dhbWUtb3Zlci53YXZcIik7XHJcblxyXG5mdW5jdGlvbiBpbmNyZWFzZVNjb3JlKClcclxue1xyXG4gICsrc2NvcmU7XHJcbiAgY29uc3QgaGlnaFNjb3JlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaGlnaC1zY29yZVwiKTtcclxuICBpZiAoc2NvcmUgPiAraGlnaFNjb3JlKVxyXG4gIHtcclxuICAgIHNldEhpZ2hTY29yZShzY29yZSk7XHJcbiAgfVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1zY29yZSA+IC5zY29yZVwiKS50ZXh0Q29udGVudCA9IHNjb3JlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0KClcclxue1xyXG4gIEJvYXJkLmRyYXdCb2FyZChib2FyZCk7XHJcbiAgQm9hcmQuZHJhd0Zvb2QoZm9vZCk7XHJcbiAgQm9hcmQuZHJhd1NuYWtlKHNuYWtlKTtcclxuXHJcbiAgLy8gS0VZQk9BUkQgQ09OVFJPTFNcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XHJcbiAgICBcclxuICAgIGlmIChtb3ZlZCA9PT0gZmFsc2UpIHJldHVybjsgLy8gSUYgVEhFIFNOQUtFIEhBU04nVCBNT1ZFRCwgRE9OJ1QgVEFLRSBBIE5FVyBJTlBVVFxyXG4gICAgaWYgKGtleSA9PT0gTEVGVF9LRVkgJiYgZGVsdGFfY29vcmRpbmF0ZS54ICE9PSAxKVxyXG4gICAge1xyXG4gICAgICBkZWx0YV9jb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoLTEsIDApO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PT0gVVBfS0VZICYmIGRlbHRhX2Nvb3JkaW5hdGUueSAhPT0gMSlcclxuICAgIHtcclxuICAgICAgZGVsdGFfY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKDAsIC0xKTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09IERPV05fS0VZICYmIGRlbHRhX2Nvb3JkaW5hdGUueSAhPT0gLTEpXHJcbiAgICB7XHJcbiAgICAgIGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgwLCAxKTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09IFJJR0hUX0tFWSAmJiBkZWx0YV9jb29yZGluYXRlLnggIT09IC0xKVxyXG4gICAge1xyXG4gICAgICBkZWx0YV9jb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoMSwgMCk7XHJcbiAgICB9XHJcbiAgICBtb3ZlZCA9IGZhbHNlO1xyXG4gIH0pO1xyXG5cclxuICAvLyBUT1VDSFNDUkVFTiBDT05UUk9MU1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgdG91Y2hYc3RhcnQgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICB0b3VjaFlzdGFydCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcclxuICB9KTtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcclxuICAgIHRvdWNoWGVuZCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcclxuICAgIHRvdWNoWWVuZCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcclxuXHJcbiAgICBjb25zdCB4RGlmZiA9IHRvdWNoWGVuZCAtIHRvdWNoWHN0YXJ0O1xyXG4gICAgY29uc3QgeURpZmYgPSB0b3VjaFllbmQgLSB0b3VjaFlzdGFydDtcclxuXHJcbiAgICBpZiAoTWF0aC5zcXJ0KHhEaWZmICogeERpZmYgKyB5RGlmZiAqIHlEaWZmKSA8IDIyIHx8ICFpc0dhbWVTdGFydGVkKCkpIHJldHVybjtcclxuXHJcbiAgICB0b3VjaFhzdGFydCA9IHRvdWNoWGVuZDtcclxuICAgIHRvdWNoWXN0YXJ0ID0gdG91Y2hZZW5kO1xyXG5cclxuICAgIGxldCBzd2lwZUFuZ2xlID0gKChNYXRoLmF0YW4yKHlEaWZmLCB4RGlmZikgLyBNYXRoLlBJKSAqIDE4MCArIDM2MCkgJSAzNjA7XHJcbiAgICBpZiAoc3dpcGVBbmdsZSA+PSA0NSAmJiBzd2lwZUFuZ2xlIDwgMTM1ICYmIGRlbHRhX2Nvb3JkaW5hdGUueSAhPT0gLTEpXHJcbiAgICB7XHJcbiAgICAgIGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgwLCAxKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHN3aXBlQW5nbGUgPj0gMTM1ICYmIHN3aXBlQW5nbGUgPCAyMjUgJiYgZGVsdGFfY29vcmRpbmF0ZS54ICE9PSAxKVxyXG4gICAge1xyXG4gICAgICBkZWx0YV9jb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoLTEsIDApXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzd2lwZUFuZ2xlID49MjI1ICYmIHN3aXBlQW5nbGUgPCAzMTUgJiYgZGVsdGFfY29vcmRpbmF0ZS55ICE9PSAxKVxyXG4gICAge1xyXG4gICAgICBkZWx0YV9jb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoMCwgLTEpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc3dpcGVBbmdsZSA+PSAzMTUgfHwgc3dpcGVBbmdsZSA8IDQ1KVxyXG4gICAge1xyXG4gICAgICBpZiAoZGVsdGFfY29vcmRpbmF0ZS54ICE9PSAtMSlcclxuICAgICAge1xyXG4gICAgICAgIGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgxLCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoaWdoU2NvcmUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoaWdoLXNjb3JlXCIpO1xyXG4gIGlmIChoaWdoU2NvcmUgPT09IG51bGwpXHJcbiAge1xyXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaGlnaC1zY29yZVwiLCBcIjBcIik7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oaWdoLXNjb3JlID4gLnNjb3JlXCIpLnRleHRDb250ZW50ID0gaGlnaFNjb3JlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdhbWVNb2RlbHMoKVxyXG57XHJcbiAgaWYgKGZvb2QuaXNFYXRlbihzbmFrZS5nZXRIZWFkQ29vcmRpbmF0ZSgpKSkgeyAvLyBSRVNQQVdOIEZPT0QgQVQgQSBQTEFDRSBOT1QgV0hFUkUgU05BS0UgSVNcclxuICAgIHNuYWtlLmdyb3coKTtcclxuICAgIGZvb2RFYXRlZFNvdW5kLnBsYXkoKTtcclxuICAgIGluY3JlYXNlU2NvcmUoKTtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgIGZvb2QucmVzcGF3bigpO1xyXG4gICAgfSB3aGlsZSAoc25ha2UuY2hlY2tGb3JDb2xsaXNpb24oZm9vZC5nZXRDb29yZGluYXRlKCkpIHx8IGZvb2QuaXNFYXRlbihzbmFrZS5nZXRIZWFkQ29vcmRpbmF0ZSgpKSk7XHJcblxyXG4gICAgY29uc3QgY3VycmVudE1pbGxpc2Vjb25kUGVyTW92ZW1lbnQgPSBnZXRNaWxsaXNlY29uZFBlck1vdmVtZW50KCk7XHJcbiAgICBpZiAoY3VycmVudE1pbGxpc2Vjb25kUGVyTW92ZW1lbnQgPiA1MClcclxuICAgIHtcclxuICAgICAgc2V0TWlsbGlzZWNvbmRQZXJNb3ZlbWVudChjdXJyZW50TWlsbGlzZWNvbmRQZXJNb3ZlbWVudCAtIDUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBzbmFrZS5tb3ZlKGRlbHRhX2Nvb3JkaW5hdGUpO1xyXG4gIG1vdmVkID0gdHJ1ZTtcclxuICBpZiAoc25ha2UuaXNBdEJvdW5kYXJ5KCkgfHwgc25ha2UuY2hlY2tGb3JDb2xsaXNpb24oc25ha2UuZ2V0SGVhZENvb3JkaW5hdGUoKSkpIHtcclxuICAgIHNldEdhbWVPdmVyKCk7XHJcbiAgICBnYW1lT3ZlclNvdW5kLnBsYXkoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlRnJhbWUoKVxyXG57XHJcbiAgdHJ5IHtcclxuICAgIEJvYXJkLmNsZWFyQm9hcmQoYm9hcmQpO1xyXG4gICAgQm9hcmQuZHJhd0Zvb2QoZm9vZCk7XHJcbiAgICBCb2FyZC5kcmF3U25ha2Uoc25ha2UpO1xyXG4gIH1cclxuICBjYXRjaCAoZXJyKVxyXG4gIHtcclxuICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcclxuICB9ICBcclxufVxyXG4iLCJpbXBvcnQgeyBDb29yZGluYXRlIH0gZnJvbSBcIi4vY29vcmRpbmF0ZVwiO1xyXG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU25ha2Uge1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHNuYWtlSGVhZCA9IG5ldyBTZWdtZW50KDEwLCAyKTtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW3NuYWtlSGVhZCwgbmV3IFNlZ21lbnQoMTAsIDEpLCBuZXcgU2VnbWVudCgxMCwgMCldO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoZGVsdGFfY29vcmQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKChNYXRoLmFicyhkZWx0YV9jb29yZC54KSArIE1hdGguYWJzKGRlbHRhX2Nvb3JkLnkpKSAhPT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY29vcmRpbmF0ZSwgc3VtIG9mIGNvb3JkaW5hdGUgbXVzdCBiZSAxXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxOyBpID4gMDsgLS1pKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZWdtZW50c1tpXS5mb2xsb3codGhpcy5zZWdtZW50c1tpLTFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWdtZW50c1swXS5tb3ZlKGRlbHRhX2Nvb3JkKTtcclxuICAgIH1cclxuXHJcbiAgICBncm93KClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBuZXdTZWdtZW50ID0gbmV3IFNlZ21lbnQoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKG5ld1NlZ21lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRm9yQ29sbGlzaW9uKGNvb3JkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghQ29vcmRpbmF0ZS5pc0Nvb3JkaW5hdGUoY29vcmQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIENvb3JkaW5hdGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGggPT09IDEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuc2VnbWVudHMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBzZWdtZW50Q29vcmQgPSB0aGlzLnNlZ21lbnRzW2ldLmdldENvb3JkaW5hdGUoKTtcclxuICAgICAgICAgICAgaWYgKHNlZ21lbnRDb29yZC5lcXVhbChjb29yZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZWFkQ29vcmRpbmF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VnbWVudHNbMF0uZ2V0Q29vcmRpbmF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQXRCb3VuZGFyeSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc25ha2VIZWFkID0gdGhpcy5nZXRIZWFkQ29vcmRpbmF0ZSgpO1xyXG4gICAgICAgIHJldHVybiAoc25ha2VIZWFkLnggPj0gQm9hcmQuQ0VMTF9QRVJfV0lEVEggfHxcclxuICAgICAgICAgICAgICAgIHNuYWtlSGVhZC55ID49IEJvYXJkLkNFTExfUEVSX0hFSUdIVCB8fFxyXG4gICAgICAgICAgICAgICAgc25ha2VIZWFkLnggPCAwIHx8IHNuYWtlSGVhZC55IDwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzU25ha2Uob2JqKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBTbmFrZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIFNlZ21lbnQge1xyXG4gICAgI2Nvb3JkaW5hdGU7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuI2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSh4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICBmb2xsb3coc2VnbWVudClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBpc1NlZ21lbnQgPSBzZWdtZW50IGluc3RhbmNlb2YgU2VnbWVudDtcclxuICAgICAgICBpZiAoIWlzU2VnbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgY2xhc3MgLSBTZWdtZW50XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VnbWVudENvb3JkID0gc2VnbWVudC5nZXRDb29yZGluYXRlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy4jY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKHNlZ21lbnRDb29yZC54LCBzZWdtZW50Q29vcmQueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29vcmRpbmF0ZShjb29yZClcclxuICAgIHtcclxuICAgICAgICBpZiAoIUNvb3JkaW5hdGUuaXNDb29yZGluYXRlKGNvb3JkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgY2xhc3MgLSBDb29yZGluYXRlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4jY29vcmRpbmF0ZSA9IGNvb3JkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3JkaW5hdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNjb29yZGluYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoZGVsdGFfY29vcmQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFDb29yZGluYXRlLmlzQ29vcmRpbmF0ZShkZWx0YV9jb29yZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoTWF0aC5hYnMoZGVsdGFfY29vcmQueCkgKyBNYXRoLmFicyhkZWx0YV9jb29yZC55KSkgPT09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLiNjb29yZGluYXRlLmFkZChkZWx0YV9jb29yZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGEgdmFsaWQgZGVsdGEgY29vcmRpbmF0ZVwiKTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgaXNHYW1lT3ZlciwgaXNHYW1lU3RhcnRlZCwgZ2V0TWlsbGlzZWNvbmRQZXJNb3ZlbWVudCwgc3RhcnRHYW1lIH0gZnJvbSBcIi4vZ2xvYmFsX2RhdGFcIjtcclxuaW1wb3J0IHsgY29tcG9zZUZyYW1lLCBpbml0LCB1cGRhdGVHYW1lTW9kZWxzIH0gZnJvbSBcIi4vbG9naWNcIjtcclxuXHJcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1idG4nKTtcclxucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGlmICghaXNHYW1lU3RhcnRlZCgpKVxyXG4gICAge1xyXG4gICAgICAgIHBsYXlCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5jb25zdCByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNldC1idG4nKTtcclxucmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTsgXHJcbn0pO1xyXG5cclxuaW5pdCgpO1xyXG5cclxubGV0IHN0YXJ0O1xyXG5cclxuZnVuY3Rpb24gbWFpbih0aW1lc3RhbXApIHtcclxuICAgIGlmIChpc0dhbWVPdmVyKCkpIHJldHVybjtcclxuICAgIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIHN0YXJ0ID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBlbGFwc2VkVGltZSA9IHRpbWVzdGFtcCAtIHN0YXJ0O1xyXG5cclxuICAgIGlmIChlbGFwc2VkVGltZSA+PSBnZXRNaWxsaXNlY29uZFBlck1vdmVtZW50KCkpXHJcbiAgICB7XHJcbiAgICAgICAgY29tcG9zZUZyYW1lKCk7XHJcbiAgICAgICAgdXBkYXRlR2FtZU1vZGVscygpO1xyXG4gICAgICAgIHN0YXJ0ID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluKTtcclxufVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9