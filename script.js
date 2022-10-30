// Game Controller Object
const gameController = (() => {
    // determine which player goes first
    return {};
})();

// GameBoard Object
const gameBoard = (() => {
    const gameBoardArray = ["O","X","O","O","X","O","O","X","B"];
    const gameBoardCells = document.getElementById("game-board").children;
    const updateBoard = () => {
        const cellArray = Array.from(gameBoardCells);
        for (let cell = 0; cell < gameBoardCells.length; cell++) {
            const element = gameBoardCells[cell]
            element.textContent = gameBoardArray[cell];  
        }
    }
    return {updateBoard};
})();


// Player Factory Function
const Player = (name) => {
    return {name};
}

const player1 = Player("Carson");
const player2 = Player("AI");

gameBoard.updateBoard();
