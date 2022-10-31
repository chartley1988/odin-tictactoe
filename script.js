// Game Controller Object
const gameController = (() => {
    // Properties
    let playerTurn = 0; // Which players turn is it?
    let turnCount = 0; // How many turns have been played?
    let win = false;
    // Functions
    const initializeGame = () => {
        gameBoard.resetBoard();
        playerTurn = player1;
        console.log('Let the game begin!')
        console.log(`${player1.name}'s turn!`)
    }
    //------------------------
    const playTurn = () => {
        let board = gameBoard.getCellArray();
        for(let cell = 0; cell < board.length; cell++) {
            ['click', 'touchend'].forEach(evt =>
            board[cell].addEventListener(evt, () => {
                if(!win){
                    if(gameBoard.isCellOccupied(cell) === false) {
                        gameBoard.placeSymbol(playerTurn.boardSymbol, cell);
                        if(checkForWin()){
                            endGame();
                        };
                        endTurn();
                        return
                    } else {
                        console.log("This cell is already played, choose another!");
                        return
                    }
                }
            }))
        }
    }
    //------------------------
    const endTurn = () => {
        if(!win){
            if(playerTurn === player1){
                playerTurn = player2;
            } else {
                playerTurn = player1;
            }
            turnCount++; 
            console.log(`End of Turn ${turnCount}`);
            console.log(`${playerTurn.name}'s turn.`)
            return
        }
    }
    //------------------------
    const playGame = () => {
        initializeGame();
        playTurn();
    }
    //------------------------
    const endGame = () => {
        console.log("Game Over!")
        // setTimeout(initializeGame, 3000);
    }
    //------------------------
    const checkForWin = () => {
        const board = gameBoard.gameBoardArray;
        const winConditions = [
            [board[0],board[1],board[2]],
            [board[3],board[4],board[5]],
            [board[6],board[7],board[8]],
            [board[0],board[3],board[6]],
            [board[2],board[5],board[8]],
            [board[0],board[4],board[8]],
            [board[2],board[4],board[6]]
        ];
        winConditions.forEach(condition => {
            if(checkWinCondition(condition)){
                console.log(`${playerTurn.name} wins!`);
                win = true;
            };
        });
        if(win) return(true);
    }
    //------------------------
    const checkWinCondition= (condition) => {
        const sign = playerTurn.boardSymbol;
        let winCount = 0;
        for(let i = 0; i < 3; i++){
            if(condition[i] === sign){winCount++};
        }
        if(winCount === 3){
            return(true);
        }
    };
    //------------------------
    return {
        initializeGame,
        playGame,
        endGame,
    };
})();

// GameBoard Object
const gameBoard = (() => {
// Properties 
    const gameBoardArray = ["","","","","","","","",""];
    const gameBoardCells = document.getElementById("game-board").children;
    const cellArray = Array.from(gameBoardCells);
    
// Functions
    const resetBoard = () => {
        for (let cell = 0; cell < gameBoardArray.length; cell++) {
            gameBoardArray[cell] = "";
        }
        updateBoard();
    }

    const isCellOccupied = (cell) => { // returns true if theres a marker there, false if empty
        if(gameBoardArray[cell] === "") {
            return(false);
        } else {
            return(true);
        }
    }
    const placeSymbol = (playerSymbol, boardCell) => {
        gameBoardArray[boardCell] = playerSymbol;
        updateBoard();
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
    return {
        gameBoardArray,
        resetBoard,
        updateBoard,
        placeSymbol,
        getCellArray,
        isCellOccupied
        };
})();


// Player Factory Function
const Player = (name, boardSymbol) => {
    let ai = false;
    const set_ai = (choice) => {
        ai = choice;
    } 
    return {name, boardSymbol, set_ai};
}

const player1 = Player("Carson", "C");
const player2 = Player("Leah", "L");
gameController.playGame();


