let gameStarted = false;
let gameOver = false;

export const setGameOver = (callback) => {
    gameOver = true;
    document.querySelector(".game-over").classList.toggle("true");
    if (callback !== undefined)
    {
        callback();
    }
}

export const startGame = () => {
    gameStarted = true;
}

export const isGameStarted = () => gameStarted;
export const isGameOver = () => gameOver;