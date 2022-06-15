import { isGameOver, isGameStarted, startGame } from "./global_data";
import { composeFrame, init, updateGameModels } from "./logic";

const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', () => {
    if (!isGameStarted())
    {
        playBtn.setAttribute('disabled', 'true');
        startGame();
        (() => {
            try {
                main();
            }
            catch (error) {
                console.log(error.message);
            }
        })();
    }
});

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    location.reload(); 
});

init();

function main() {
    if (isGameOver()) return;

    setTimeout(() => {
        composeFrame();
        updateGameModels();

        main();
    }, 100);
}
