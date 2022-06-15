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

    static drawSnake(snake)
    {
        if (!_snake__WEBPACK_IMPORTED_MODULE_1__.Snake.isSnake(snake))
        {
            throw new Error("Object passed is not an instance of class - Snake");
        }

        const snakeSegments = snake.segments;
        snakeSegments.forEach((segment) => {
            this.drawSegment(segment);
        });
    }

    static drawSegment(segment)
    {
        let coord = segment.getCoordinate();
        const cell = document.querySelector(`.coord-${coord.x}-${coord.y}`);
        cell.classList.toggle("segment");
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
        this.#coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate(+x, +y);
    }

    #getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    respawn()
    {
        let x = this.#getRandomArbitrary(0, _board__WEBPACK_IMPORTED_MODULE_0__.Board.CELL_PER_WIDTH - 1);
        let y = this.#getRandomArbitrary(0, _board__WEBPACK_IMPORTED_MODULE_0__.Board.CELL_PER_HEIGHT);

        this.#coordinate = new _coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, y);
    }

    getCoordinate()
    {
        return this.#coordinate;
    }

    isEaten(coord)
    {
        return (this.#coordinate.x === coord.x && this.#coordinate.y === coord.y);
    }

    static isFood(obj)
    {
        return obj instanceof Food;
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
        this.#coordinate = segment.coordinate;
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
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food */ "./src/food.js");



const board = document.querySelector('.board');
const food = new _food__WEBPACK_IMPORTED_MODULE_1__.Food(2, 1);

_board__WEBPACK_IMPORTED_MODULE_0__.Board.drawBoard(board);
_board__WEBPACK_IMPORTED_MODULE_0__.Board.drawFood(food);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmdDO0FBQ0Y7QUFDOUI7QUFDQTtBQUNBLGlCQUFpQix1Q0FBSTtBQUNyQjtBQUNBLG1EQUFlO0FBQ2Ysa0RBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovL3NuYWtlLWdhbWUvLi9zcmMvY29vcmRpbmF0ZS5qcyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lLy4vc3JjL2Zvb2QuanMiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9zbmFrZS5qcyIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NuYWtlLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbmFrZS1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc25ha2UtZ2FtZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb29kIH0gZnJvbSBcIi4vZm9vZFwiO1xyXG5pbXBvcnQgeyBTbmFrZSB9IGZyb20gXCIuL3NuYWtlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9hcmQge1xyXG4gICAgc3RhdGljIENFTExfRElNRU5TSU9OID0gMjA7XHJcbiAgICBzdGF0aWMgQ0VMTF9QRVJfV0lEVEggPSAyMDtcclxuICAgIHN0YXRpYyBDRUxMX1BFUl9IRUlHSFQgPSAyMDtcclxuXHJcbiAgICBzdGF0aWMgZHJhd0JvYXJkKGNvbnRhaW5lcilcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuQ0VMTF9QRVJfSEVJR0hUOyArK3kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuQ0VMTF9QRVJfV0lEVEg7ICsreClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gYGNlbGwgY29vcmQtJHt4fS0ke3l9YDtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZHJhd1NuYWtlKHNuYWtlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghU25ha2UuaXNTbmFrZShzbmFrZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIFNuYWtlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc25ha2VTZWdtZW50cyA9IHNuYWtlLnNlZ21lbnRzO1xyXG4gICAgICAgIHNuYWtlU2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdTZWdtZW50KHNlZ21lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkcmF3U2VnbWVudChzZWdtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb29yZCA9IHNlZ21lbnQuZ2V0Q29vcmRpbmF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29vcmQtJHtjb29yZC54fS0ke2Nvb3JkLnl9YCk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwic2VnbWVudFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZHJhd0Zvb2QoZm9vZClcclxuICAgIHtcclxuICAgICAgICBpZiAoIUZvb2QuaXNGb29kKGZvb2QpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJnbXVlbnQgcGFzc2VkIGlzIG5vdCBhIHZhbGlkIGluc3RhbmNlIG9mIGNsYXNzIC0gRm9vZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvb3JkID0gZm9vZC5nZXRDb29yZGluYXRlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY29vcmQtJHtjb29yZC54fS0ke2Nvb3JkLnl9YCk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwiZm9vZFwiKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb29yZGluYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChjb29yZGluYXRlKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGlzQ29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUgaW5zdGFuY2VvZiBDb29yZGluYXRlO1xyXG4gICAgICAgIGlmICghaXNDb29yZGluYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIENvb3JkaW5hdGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMueCArPSBjb29yZGluYXRlLng7XHJcbiAgICAgICAgdGhpcy55ICs9IGNvb3JkaW5hdGUueTtcclxuICAgIH1cclxuXHJcbiAgICBlcXVhbChjb29yZGluYXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghY29vcmRpbmF0ZSBpbnN0YW5jZW9mIENvb3JkaW5hdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnggPT09IGNvb3JkaW5hdGUueCAmJiB0aGlzLnkgPT09IGNvb3JkaW5hdGUueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzQ29vcmRpbmF0ZShvYmopXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIENvb3JkaW5hdGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL2JvYXJkXCI7XHJcbmltcG9ydCB7IENvb3JkaW5hdGUgfSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9vZCB7XHJcbiAgICAjY29vcmRpbmF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuI2Nvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSgreCwgK3kpO1xyXG4gICAgfVxyXG5cclxuICAgICNnZXRSYW5kb21BcmJpdHJhcnkobWluLCBtYXgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3Bhd24oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB4ID0gdGhpcy4jZ2V0UmFuZG9tQXJiaXRyYXJ5KDAsIEJvYXJkLkNFTExfUEVSX1dJRFRIIC0gMSk7XHJcbiAgICAgICAgbGV0IHkgPSB0aGlzLiNnZXRSYW5kb21BcmJpdHJhcnkoMCwgQm9hcmQuQ0VMTF9QRVJfSEVJR0hUKTtcclxuXHJcbiAgICAgICAgdGhpcy4jY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3JkaW5hdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNjb29yZGluYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRWF0ZW4oY29vcmQpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLiNjb29yZGluYXRlLnggPT09IGNvb3JkLnggJiYgdGhpcy4jY29vcmRpbmF0ZS55ID09PSBjb29yZC55KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNGb29kKG9iailcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRm9vZDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvb3JkaW5hdGUgfSBmcm9tIFwiLi9jb29yZGluYXRlXCI7XHJcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTbmFrZSB7XHJcbiAgICBzdGF0aWMgI2hlYWRDb2xvciA9IFwiZ3JlZW5cIjtcclxuICAgIHN0YXRpYyAjYm9keUNvbG9yID0gXCJ5ZWxsb3dcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc25ha2VIZWFkID0gbmV3IFNlZ21lbnQoMTAsIDIpO1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbc25ha2VIZWFkLCBuZXcgU2VnbWVudCgxMCwgMSksIG5ldyBTZWdtZW50KDEwLCAwKV07XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShkZWx0YV9jb29yZClcclxuICAgIHtcclxuICAgICAgICBpZiAoKE1hdGguYWJzKGRlbHRhX2Nvb3JkLngpICsgTWF0aC5hYnMoZGVsdGFfY29vcmQueSkpICE9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBjb29yZGluYXRlLCBzdW0gb2YgY29vcmRpbmF0ZSBtdXN0IGJlIDFcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDE7IGkgPiAxOyAtLWkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNlZ21lbnRzW2ldLmZvbGxvdyh0aGlzLnNlZ21lbnRzW2ktMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlZ21lbnRzWzBdLm1vdmUoZGVsdGFfY29vcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdyb3coKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG5ld1NlZ21lbnQgPSBuZXcgU2VnbWVudCgwLCAwKTtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzLnB1c2gobmV3U2VnbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JDb2xsaXNpb24oY29vcmQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFDb29yZGluYXRlLmlzQ29vcmRpbmF0ZShjb29yZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5zZWdtZW50cy5sZW5ndGg7ICsraSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRDb29yZCA9IHRoaXMuc2VnbWVudHNbaV0uZ2V0Q29vcmRpbmF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoc2VnbWVudENvb3JkLmVxdWFsKGNvb3JkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlYWRDb29yZGluYXRlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWdtZW50c1swXS5nZXRDb29yZGluYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBdEJvdW5kYXJ5KClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzbmFrZUhlYWQgPSB0aGlzLmdldEhlYWRDb29yZGluYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIChzbmFrZUhlYWQueCA+PSBCb2FyZC5DRUxMX1BFUl9XSURUSCB8fFxyXG4gICAgICAgICAgICAgICAgc25ha2VIZWFkLnkgPj0gQm9hcmQuQ0VMTF9QRVJfSEVJR0hUIHx8XHJcbiAgICAgICAgICAgICAgICBzbmFrZUhlYWQueCA8IDAgfHwgc25ha2VIZWFkLnkgPCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNTbmFrZShvYmopXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIFNuYWtlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgU2VnbWVudCB7XHJcbiAgICAjY29vcmRpbmF0ZTtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy4jY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvbGxvdyhzZWdtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGlzU2VnbWVudCA9IHNlZ21lbnQgaW5zdGFuY2VvZiBTZWdtZW50O1xyXG4gICAgICAgIGlmICghaXNTZWdtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgcGFzc2VkIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBjbGFzcyAtIFNlZ21lbnRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuI2Nvb3JkaW5hdGUgPSBzZWdtZW50LmNvb3JkaW5hdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29vcmRpbmF0ZShjb29yZClcclxuICAgIHtcclxuICAgICAgICBpZiAoIUNvb3JkaW5hdGUuaXNDb29yZGluYXRlKGNvb3JkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgY2xhc3MgLSBDb29yZGluYXRlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4jY29vcmRpbmF0ZSA9IGNvb3JkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3JkaW5hdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNjb29yZGluYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoZGVsdGFfY29vcmQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFDb29yZGluYXRlLmlzQ29vcmRpbmF0ZShkZWx0YV9jb29yZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwYXNzZWQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGNsYXNzIC0gQ29vcmRpbmF0ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoTWF0aC5hYnMoZGVsdGFfY29vcmQueCkgKyBNYXRoLmFicyhkZWx0YV9jb29yZC55KSkgPT09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLiNjb29yZGluYXRlLmFkZChkZWx0YV9jb29yZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGEgdmFsaWQgZGVsdGEgY29vcmRpbmF0ZVwiKTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi9ib2FyZFwiO1xyXG5pbXBvcnQgeyBGb29kIH0gZnJvbSBcIi4vZm9vZFwiO1xyXG5cclxuY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQnKTtcclxuY29uc3QgZm9vZCA9IG5ldyBGb29kKDIsIDEpO1xyXG5cclxuQm9hcmQuZHJhd0JvYXJkKGJvYXJkKTtcclxuQm9hcmQuZHJhd0Zvb2QoZm9vZCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==