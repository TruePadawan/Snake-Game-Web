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
/* harmony export */   "isGameOver": () => (/* binding */ isGameOver),
/* harmony export */   "isGameStarted": () => (/* binding */ isGameStarted),
/* harmony export */   "setGameOver": () => (/* binding */ setGameOver),
/* harmony export */   "startGame": () => (/* binding */ startGame)
/* harmony export */ });
let gameStarted = false;
let gameOver = false;

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

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

function init()
{
  _board__WEBPACK_IMPORTED_MODULE_0__.Board.drawBoard(board);
  _board__WEBPACK_IMPORTED_MODULE_0__.Board.drawFood(food);
  _board__WEBPACK_IMPORTED_MODULE_0__.Board.drawSnake(snake);

  document.addEventListener('keydown', (event) => {
    const key = event.keyCode;
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

  });
}

function updateGameModels()
{
  if (food.isEaten(snake.getHeadCoordinate())) { // RESPAWN FOOD AT A PLACE NOT WHERE SNAKE IS
    snake.grow();

    do {
      food.respawn();
    } while (snake.checkForCollision(food.getCoordinate()) || food.isEaten(snake.getHeadCoordinate()));
  }
  
  snake.move(delta_coordinate);
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

    if (elapsedTime >= 100)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O0FDTnFFO0FBQ047QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsU0FBUywyREFBYTtBQUN0QjtBQUNBO0FBQ0EsUUFBUSx1REFBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDRDQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFVO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0RBQVk7QUFDcEIsUUFBUSx3REFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9jb29yZGluYXRlLmpzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvZm9vZC5qcyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL2dsb2JhbF9kYXRhLmpzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9zbmFrZS5qcyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb29kIH0gZnJvbSBcIi4vZm9vZFwiO1xyXG5pbXBvcnQgeyBTbmFrZSB9IGZyb20gXCIuL3NuYWtlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9hcmQge1xyXG4gICAgc3RhdGljIENFTExfRElNRU5TSU9OID0gMjA7XHJcbiAgICBzdGF0aWMgQ0VMTF9QRVJfV0lEVEggPSAyMDtcclxuICAgIHN0YXRpYyBDRUxMX1BFUl9IRUlHSFQgPSAyMDtcclxuXHJcbiAgICBzdGF0aWMgZHJhd0JvYXJkKGNvbnRhaW5lcilcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuQ0VMTF9QRVJfSEVJR0hUOyArK3kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuQ0VMTF9QRVJfV0lEVEg7ICsreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gYGNlbGwgY29vcmQtJHt4fS0ke3l9YDtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2xlYXJCb2FyZChjb250YWluZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiZm9vZFwiKTtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwic2VnbWVudFwiKTtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGVhZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZHJhd1NuYWtlKHNuYWtlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghU25ha2UuaXNTbmFrZShzbmFrZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIFNuYWtlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc25ha2VTZWdtZW50cyA9IHNuYWtlLnNlZ21lbnRzO1xyXG4gICAgICAgIHNuYWtlU2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3U2VnbWVudChzZWdtZW50LCBpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRyYXdTZWdtZW50KHNlZ21lbnQsIGluZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb29yZCA9IHNlZ21lbnQuZ2V0Q29vcmRpbmF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29vcmQtJHtjb29yZC54fS0ke2Nvb3JkLnl9YCk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwic2VnbWVudFwiKTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC50b2dnbGUoXCJoZWFkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZHJhd0Zvb2QoZm9vZClcclxuICAgIHtcclxuICAgICAgICBpZiAoIUZvb2QuaXNGb29kKGZvb2QpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJnbXVlbnQgcGFzc2VkIGlzIG5vdCBhIHZhbGlkIGluc3RhbmNlIG9mIGNsYXNzIC0gRm9vZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvb3JkID0gZm9vZC5nZXRDb29yZGluYXRlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29vcmQtJHtjb29yZC54fS0ke2Nvb3JkLnl9YCk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwiZm9vZFwiKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb29yZGluYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChjb29yZGluYXRlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGlzQ29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUgaW5zdGFuY2VvZiBDb29yZGluYXRlO1xyXG4gICAgICAgIGlmICghaXNDb29yZGluYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIENvb3JkaW5hdGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMueCArPSBjb29yZGluYXRlLng7XHJcbiAgICAgICAgdGhpcy55ICs9IGNvb3JkaW5hdGUueTtcclxuICAgIH1cclxuXHJcbiAgICBlcXVhbChjb29yZGluYXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghY29vcmRpbmF0ZSBpbnN0YW5jZW9mIENvb3JkaW5hdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnggPT09IGNvb3JkaW5hdGUueCAmJiB0aGlzLnkgPT09IGNvb3JkaW5hdGUueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzQ29vcmRpbmF0ZShvYmopXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIENvb3JkaW5hdGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL2JvYXJkXCI7XHJcbmltcG9ydCB7IENvb3JkaW5hdGUgfSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9vZCB7XHJcbiAgICAjY29vcmRpbmF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KVxyXG4gICAge1xyXG4gICAgICAgIGlmICh4ICE9PSB1bmRlZmluZWQgJiYgeSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy4jY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKHgsIHkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNwYXduKCk7XHJcbiAgICAgICAgfSB3aGlsZSAodGhpcy4jY29vcmRpbmF0ZS54ID09PSAxMCAmJiB0aGlzLiNjb29yZGluYXRlLnkgPD0gMik7XHJcbiAgICB9XHJcblxyXG4gICAgI2dldFJhbmRvbUFyYml0cmFyeShtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzcGF3bigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLiNnZXRSYW5kb21BcmJpdHJhcnkoMCwgQm9hcmQuQ0VMTF9QRVJfV0lEVEggLSAxKTtcclxuICAgICAgICBsZXQgeSA9IHRoaXMuI2dldFJhbmRvbUFyYml0cmFyeSgwLCBCb2FyZC5DRUxMX1BFUl9IRUlHSFQgLSAxKTtcclxuICAgICAgICB0aGlzLiNjb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcmRpbmF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2Nvb3JkaW5hdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNFYXRlbihjb29yZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuI2Nvb3JkaW5hdGUuZXF1YWwoY29vcmQpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNGb29kKG9iailcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRm9vZDtcclxuICAgIH1cclxufSIsImxldCBnYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG5sZXQgZ2FtZU92ZXIgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRHYW1lT3ZlciA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgZ2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLW92ZXJcIikuY2xhc3NMaXN0LnRvZ2dsZShcInRydWVcIik7XHJcbiAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgZ2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNHYW1lU3RhcnRlZCA9ICgpID0+IGdhbWVTdGFydGVkO1xyXG5leHBvcnQgY29uc3QgaXNHYW1lT3ZlciA9ICgpID0+IGdhbWVPdmVyOyIsImltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vYm9hcmRcIjtcclxuaW1wb3J0IHsgRm9vZCB9IGZyb20gXCIuL2Zvb2RcIjtcclxuaW1wb3J0IHsgU25ha2UgfSBmcm9tIFwiLi9zbmFrZVwiO1xyXG5pbXBvcnQgeyBDb29yZGluYXRlIH0gZnJvbSBcIi4vY29vcmRpbmF0ZVwiO1xyXG5pbXBvcnQgeyBzZXRHYW1lT3ZlciB9IGZyb20gXCIuL2dsb2JhbF9kYXRhXCI7XHJcblxyXG5jb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmRcIik7XHJcbmNvbnN0IHNuYWtlID0gbmV3IFNuYWtlKCk7XHJcbmNvbnN0IGZvb2QgPSBuZXcgRm9vZCgpO1xyXG5sZXQgZGVsdGFfY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKDAsIDEpO1xyXG5cclxuY29uc3QgTEVGVF9LRVkgPSAzNztcclxuY29uc3QgUklHSFRfS0VZID0gMzk7XHJcbmNvbnN0IFVQX0tFWSA9IDM4O1xyXG5jb25zdCBET1dOX0tFWSA9IDQwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKVxyXG57XHJcbiAgQm9hcmQuZHJhd0JvYXJkKGJvYXJkKTtcclxuICBCb2FyZC5kcmF3Rm9vZChmb29kKTtcclxuICBCb2FyZC5kcmF3U25ha2Uoc25ha2UpO1xyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlO1xyXG4gICAgaWYgKGtleSA9PT0gTEVGVF9LRVkgJiYgZGVsdGFfY29vcmRpbmF0ZS54ICE9PSAxKVxyXG4gICAge1xyXG4gICAgICBkZWx0YV9jb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoLTEsIDApO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleSA9PT0gVVBfS0VZICYmIGRlbHRhX2Nvb3JkaW5hdGUueSAhPT0gMSlcclxuICAgIHtcclxuICAgICAgZGVsdGFfY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKDAsIC0xKTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09IERPV05fS0VZICYmIGRlbHRhX2Nvb3JkaW5hdGUueSAhPT0gLTEpXHJcbiAgICB7XHJcbiAgICAgIGRlbHRhX2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgwLCAxKTtcclxuICAgIH1cclxuICAgIGlmIChrZXkgPT09IFJJR0hUX0tFWSAmJiBkZWx0YV9jb29yZGluYXRlLnggIT09IC0xKVxyXG4gICAge1xyXG4gICAgICBkZWx0YV9jb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoMSwgMCk7XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR2FtZU1vZGVscygpXHJcbntcclxuICBpZiAoZm9vZC5pc0VhdGVuKHNuYWtlLmdldEhlYWRDb29yZGluYXRlKCkpKSB7IC8vIFJFU1BBV04gRk9PRCBBVCBBIFBMQUNFIE5PVCBXSEVSRSBTTkFLRSBJU1xyXG4gICAgc25ha2UuZ3JvdygpO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgZm9vZC5yZXNwYXduKCk7XHJcbiAgICB9IHdoaWxlIChzbmFrZS5jaGVja0ZvckNvbGxpc2lvbihmb29kLmdldENvb3JkaW5hdGUoKSkgfHwgZm9vZC5pc0VhdGVuKHNuYWtlLmdldEhlYWRDb29yZGluYXRlKCkpKTtcclxuICB9XHJcbiAgXHJcbiAgc25ha2UubW92ZShkZWx0YV9jb29yZGluYXRlKTtcclxuICBpZiAoc25ha2UuaXNBdEJvdW5kYXJ5KCkgfHwgc25ha2UuY2hlY2tGb3JDb2xsaXNpb24oc25ha2UuZ2V0SGVhZENvb3JkaW5hdGUoKSkpIHtcclxuICAgIHNldEdhbWVPdmVyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUZyYW1lKClcclxue1xyXG4gIHRyeSB7XHJcbiAgICBCb2FyZC5jbGVhckJvYXJkKGJvYXJkKTtcclxuICAgIEJvYXJkLmRyYXdGb29kKGZvb2QpO1xyXG4gICAgQm9hcmQuZHJhd1NuYWtlKHNuYWtlKTtcclxuICB9XHJcbiAgY2F0Y2ggKGVycilcclxuICB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XHJcbiAgfSAgXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29vcmRpbmF0ZSB9IGZyb20gXCIuL2Nvb3JkaW5hdGVcIjtcclxuaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNuYWtlIHtcclxuICAgIHN0YXRpYyAjaGVhZENvbG9yID0gXCJncmVlblwiO1xyXG4gICAgc3RhdGljICNib2R5Q29sb3IgPSBcInllbGxvd1wiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzbmFrZUhlYWQgPSBuZXcgU2VnbWVudCgxMCwgMik7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtzbmFrZUhlYWQsIG5ldyBTZWdtZW50KDEwLCAxKSwgbmV3IFNlZ21lbnQoMTAsIDApXTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKGRlbHRhX2Nvb3JkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgoTWF0aC5hYnMoZGVsdGFfY29vcmQueCkgKyBNYXRoLmFicyhkZWx0YV9jb29yZC55KSkgIT09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNvb3JkaW5hdGUsIHN1bSBvZiBjb29yZGluYXRlIG11c3QgYmUgMVwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc2VnbWVudHMubGVuZ3RoIC0gMTsgaSA+IDA7IC0taSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VnbWVudHNbaV0uZm9sbG93KHRoaXMuc2VnbWVudHNbaS0xXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VnbWVudHNbMF0ubW92ZShkZWx0YV9jb29yZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JvdygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbmV3U2VnbWVudCA9IG5ldyBTZWdtZW50KDAsIDApO1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMucHVzaChuZXdTZWdtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0ZvckNvbGxpc2lvbihjb29yZClcclxuICAgIHtcclxuICAgICAgICBpZiAoIUNvb3JkaW5hdGUuaXNDb29yZGluYXRlKGNvb3JkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgY2xhc3MgLSBDb29yZGluYXRlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoID09PSAxKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnNlZ21lbnRzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudENvb3JkID0gdGhpcy5zZWdtZW50c1tpXS5nZXRDb29yZGluYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50Q29vcmQuZXF1YWwoY29vcmQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVhZENvb3JkaW5hdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlZ21lbnRzWzBdLmdldENvb3JkaW5hdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0F0Qm91bmRhcnkoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHNuYWtlSGVhZCA9IHRoaXMuZ2V0SGVhZENvb3JkaW5hdGUoKTtcclxuICAgICAgICByZXR1cm4gKHNuYWtlSGVhZC54ID49IEJvYXJkLkNFTExfUEVSX1dJRFRIIHx8XHJcbiAgICAgICAgICAgICAgICBzbmFrZUhlYWQueSA+PSBCb2FyZC5DRUxMX1BFUl9IRUlHSFQgfHxcclxuICAgICAgICAgICAgICAgIHNuYWtlSGVhZC54IDwgMCB8fCBzbmFrZUhlYWQueSA8IDApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc1NuYWtlKG9iailcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgU25ha2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTZWdtZW50IHtcclxuICAgICNjb29yZGluYXRlO1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLiNjb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9sbG93KHNlZ21lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgaXNTZWdtZW50ID0gc2VnbWVudCBpbnN0YW5jZW9mIFNlZ21lbnQ7XHJcbiAgICAgICAgaWYgKCFpc1NlZ21lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gU2VnbWVudFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlZ21lbnRDb29yZCA9IHNlZ21lbnQuZ2V0Q29vcmRpbmF0ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuI2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZShzZWdtZW50Q29vcmQueCwgc2VnbWVudENvb3JkLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvb3JkaW5hdGUoY29vcmQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFDb29yZGluYXRlLmlzQ29vcmRpbmF0ZShjb29yZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuI2Nvb3JkaW5hdGUgPSBjb29yZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb29yZGluYXRlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jY29vcmRpbmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKGRlbHRhX2Nvb3JkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghQ29vcmRpbmF0ZS5pc0Nvb3JkaW5hdGUoZGVsdGFfY29vcmQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIENvb3JkaW5hdGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKE1hdGguYWJzKGRlbHRhX2Nvb3JkLngpICsgTWF0aC5hYnMoZGVsdGFfY29vcmQueSkpID09PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy4jY29vcmRpbmF0ZS5hZGQoZGVsdGFfY29vcmQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBhIHZhbGlkIGRlbHRhIGNvb3JkaW5hdGVcIik7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGlzR2FtZU92ZXIsIGlzR2FtZVN0YXJ0ZWQsIHN0YXJ0R2FtZSB9IGZyb20gXCIuL2dsb2JhbF9kYXRhXCI7XHJcbmltcG9ydCB7IGNvbXBvc2VGcmFtZSwgaW5pdCwgdXBkYXRlR2FtZU1vZGVscyB9IGZyb20gXCIuL2xvZ2ljXCI7XHJcblxyXG5jb25zdCBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYnRuJyk7XHJcbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBpZiAoIWlzR2FtZVN0YXJ0ZWQoKSlcclxuICAgIHtcclxuICAgICAgICBwbGF5QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIHN0YXJ0R2FtZSgpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXQtYnRuJyk7XHJcbnJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbG9jYXRpb24ucmVsb2FkKCk7IFxyXG59KTtcclxuXHJcbmluaXQoKTtcclxuXHJcbmxldCBzdGFydDtcclxuXHJcbmZ1bmN0aW9uIG1haW4odGltZXN0YW1wKSB7XHJcbiAgICBpZiAoaXNHYW1lT3ZlcigpKSByZXR1cm47XHJcbiAgICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBzdGFydCA9IHRpbWVzdGFtcDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZWxhcHNlZFRpbWUgPSB0aW1lc3RhbXAgLSBzdGFydDtcclxuXHJcbiAgICBpZiAoZWxhcHNlZFRpbWUgPj0gMTAwKVxyXG4gICAge1xyXG4gICAgICAgIGNvbXBvc2VGcmFtZSgpO1xyXG4gICAgICAgIHVwZGF0ZUdhbWVNb2RlbHMoKTtcclxuICAgICAgICBzdGFydCA9IHRpbWVzdGFtcDtcclxuICAgIH1cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbik7XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==