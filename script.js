// GameBoard Object
const gameBoard = (() => {
    const gameBoardArray = ["X","O","","","","","","",""];
    const gameBoardCells = document.getElementById("game-board").children;
    const cellArray = Array.from(gameBoardCells);
    const isCellOccupied = (cell) => { // returns true if theres a marker there, false if empty
        if(gameBoardArray[cell] === "") {
            return(false);
        } else {
            return(true);
        }
    }
    const placeSymbol = (playerSymbol, boardCell) => {
        gameBoardArray[boardCell] = playerSymbol;
    }
    const updateBoard = () => {
        for (let cell = 0; cell < gameBoardCells.length; cell++) {
            const element = gameBoardCells[cell]
            element.textContent = gameBoardArray[cell];  
        }
    }
    const getCellArray = () => {
        return(cellArray);
    }
    return {updateBoard, placeSymbol, getCellArray, isCellOccupied};
})();


// Game Controller Object
const gameController = (() => {
    // determine who the players are, and what their symbols are
    // determine whether the second player is ai or player 2
    // determine which player goes first
    // make move
    const playTurn = (player) => {
        let board = gameBoard.getCellArray();
        for(let cell = 0; cell < board.length; cell++) {
            ['click', 'touchend'].forEach(evt =>
            board[cell].addEventListener(evt, () => {
                if(gameBoard.isCellOccupied(cell) === false) {
                    gameBoard.placeSymbol(player.boardSymbol, cell);
                    gameBoard.updateBoard();
                    endTurn();
                } else {
                    console.log("This cell is already played, choose another!");
                    return
                }

            }))
        }
    }
    const endTurn = () => {
        console.log("end Turn");
    }
    return {playTurn};
})();


// Player Factory Function
const Player = (name, boardSymbol) => {
    let ai = false;
    const set_ai = (choice) => {
        ai = choice;
    } 
    return {name, boardSymbol, set_ai};
}

const player1 = Player("Carson", "M");
const player2 = Player("AI", "T");
gameBoard.updateBoard();
gameController.playTurn(player1);


