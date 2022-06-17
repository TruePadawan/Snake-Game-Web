let gameStarted = false;
let gameOver = false;
let MILLISECOND_PER_MOVEMENT = 100;

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

export const getMillisecondPerMovement = () => MILLISECOND_PER_MOVEMENT;
export const setMillisecondPerMovement = (val) => {
    MILLISECOND_PER_MOVEMENT = val;
};

export function setHighScore(score)
{
    window.localStorage.setItem("high-score", new String(score));
    document.querySelector(".high-score > .score").textContent = score;
}