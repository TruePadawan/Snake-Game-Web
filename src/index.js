import { isGameOver, isGameStarted, startGame } from "./global_data";
import { composeFrame, init, updateGameModels } from "./logic";

const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
    if (!isGameStarted())
    {
        playBtn.setAttribute('disabled', 'true');
        startGame();
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

init();

let start;

function main(timestamp) {
    if (isGameOver()) return;
    if (start === undefined)
    {
        start = timestamp;
    }

    let elapsedTime = timestamp - start;

    if (elapsedTime >= 100)
    {
        composeFrame();
        updateGameModels();
        start = timestamp;
    }
    window.requestAnimationFrame(main);
}

