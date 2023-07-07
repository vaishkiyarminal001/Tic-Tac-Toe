document.addEventListener("DOMContentLoaded", () => {
  const gameCells = document.querySelectorAll(".grid-cell");
  const currentPlayer = document.querySelector(".current-player");
  const gameOverText = document.querySelector(".game-over-text");
  const restartButton = document.querySelector(".restart");

  let isGameOver = false;
  let currentPlayerSymbol = "X";

  gameCells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  function handleCellClick(event) {
    const cell = event.target;
    const cellValue = cell.getAttribute("data-value");

    if (cell.textContent === "" && !isGameOver) {
      cell.classList.add(currentPlayerSymbol.toLowerCase());
      cell.textContent = currentPlayerSymbol;
      cell.classList.add("disabled");

      if (checkWin(currentPlayerSymbol)) {
        gameOverText.textContent = currentPlayerSymbol + " wins!😎";
        isGameOver = true;

        triggerConfetti();
      } else if (checkDraw()) {
        gameOverText.textContent = "Draw!😢";
        isGameOver = true;
      } else {
        currentPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
        currentPlayer.textContent = "Its " + currentPlayerSymbol + " turn";
      }
    }
  }

  function checkWin(playerSymbol) {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombination.some((combination) => {
      const [a, b, c] = combination;

      return (
        gameCells[a].classList.contains(playerSymbol.toLowerCase()) &&
        gameCells[b].classList.contains(playerSymbol.toLowerCase()) &&
        gameCells[c].classList.contains(playerSymbol.toLowerCase())
      );
    });
  }

  function checkDraw() {
    return [...gameCells].every((cell) => {
      return cell.textContent !== "";
    });
  }

  restartButton.addEventListener("click", () => {
    gameCells.forEach((cell) => {
      cell.classList.remove("x", "o", "disabled");
      cell.textContent = "";
    });

    currentPlayerSymbol = "X";
    currentPlayer.textContent = "Its X turn";
    gameOverText.textContent = "";
    isGameOver = false;
  });
});


const button = document.querySelector('#button');
const canvas = document.querySelector('#confetti');

const jsConfetti = new JSConfetti();

function triggerConfetti() {
  jsConfetti.addConfetti({
    emojis: ['🎉', '⚡️', '💥', '✨', '💫', '🌟','🎉', '⚡️', '💥', '✨', '💫', '🌟'],
  });
}