// Game Controller Object
const gameController = (() => {
    let player1 = {name: "", boardSymbol: "", ai: false};
    let player2 = {name: "", boardSymbol: "", ai: false};

    // Properties
    let playerTurn = 0; // Which players turn is it?
    let turnCount = 0; // How many turns have been played?
    let win = false;
    // Functions

    const updatePlayer = (player, newPlayer) => {
        console.log(player);
        gameController.player = newPlayer;
    }

    const initializeGame = () => {
        gameController.player1 = {name: "", boardSymbol: "", ai: false};
        gameController.player2 = {name: "", boardSymbol: "", ai: false};
        player1 = uiController.makePlayer1();
        player2 = uiController.makePlayer2();
        gameController.turnCount = 0;
        gameController.playerTurn = gameController.player1;
        gameController.win = false;
        gameBoard.resetBoard();
        const banner = document.getElementById("current-player-label");
        banner.textContent = "Enter Player Stats"
    }
    //------------------------
    const playTurn = () => {
        uiController.updateCurrentPlayer(gameController.playerTurn);
        let board = gameBoard.getCellArray();
        for(let cell = 0; cell < board.length; cell++) {
            ['click', 'touchend'].forEach(evt =>
            board[cell].addEventListener(evt, () => {
                if(!gameController.win){
                    if(gameBoard.isCellOccupied(cell) === false) {
                        gameBoard.placeSymbol(gameController.playerTurn.boardSymbol, cell);
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
        if(!gameController.win){
            if(gameController.playerTurn === gameController.player1){
                gameController.playerTurn = gameController.player2;
            } else {
                gameController.playerTurn = gameController.player1;
            }
            gameController.turnCount++; 
            console.log(`End of Turn ${gameController.turnCount}`);
            console.log(`${gameController.playerTurn.name}'s turn.`)
            uiController.updateCurrentPlayer(gameController.playerTurn);
            return
        }
    }
    //------------------------
    const playGame = () => {
        if(checkPlayerInfo(gameController.player1) && checkPlayerInfo(gameController.player2)) {
            gameBoard.enableBoaard();
            console.log('Let the game begin!')
            console.log(`${gameController.player1.name}'s turn!`)
            gameController.playerTurn = gameController.player1;
            playTurn();
        }
    }
    //------------------------
    const endGame = () => {
        gameController.win = true;
        gameBoard.disableBoaard();
        console.log("Game Over!");
        uiController.updateStartButton();
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
            [board[2],board[4],board[6]],
            [board[1],board[4],board[7]]
        ];
        winConditions.forEach(condition => {
            if(checkWinCondition(condition)){
                const banner = document.getElementById("current-player-label");
                banner.textContent = "Game Over!"
                uiController.currentPlayer.textContent = (
                    `${gameController.playerTurn.name} wins!`
                );
                gameController.win = true;
            };
        });
        if(gameController.win) return(true);
    }
    const checkPlayerInfo = (player) => { // Validates whether player info has been entered correctly
        if((player.name !== "") && (player.boardSymbol !== "")) {
            return true;
        }
    }

    //------------------------
    const checkWinCondition= (condition) => {
        const sign = gameController.playerTurn.boardSymbol;
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
        player1,
        player2,
        playerTurn,
        updatePlayer,
        initializeGame,
        playGame,
        endGame,
        win,
        turnCount,
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

    const enableBoaard = () => {
        const board = document.getElementById("game-board");
        board.classList.remove("disabled");
    }

    const disableBoaard = () => {
        const board = document.getElementById("game-board");
        board.classList.add("disabled");
    }

    return {
        gameBoardArray,
        resetBoard,
        updateBoard,
        placeSymbol,
        getCellArray,
        isCellOccupied,
        enableBoaard,
        disableBoaard
        };
})();


// Player Factory Function
const PlayerFactory = (name, boardSymbol) => {
    let ai = false;
    const set_ai = (choice) => {
        ai = choice;
    } 
    return {name, boardSymbol, set_ai};
}


// Player specific UI
const PlayerUI = (playerUI) => {
    const _nameText = playerUI.querySelector('input[name="name"]');
    const _symbolText = playerUI.querySelector('input[name="symbol"]');
    const _saveButton = playerUI.querySelector('button[name="save"]');

    const disableForm = () => {
        _nameText.disabled = true;
        _symbolText.disabled = true;
        _saveButton.disabled = true;
        _saveButton.classList.add("disabled");
        playerUI.classList.add("disabled");
    }
    const enableForm = () => {
        _nameText.disabled = false;
        _symbolText.disabled = false;
        _saveButton.disabled = false;
        _saveButton.classList.remove("disabled");
        playerUI.classList.remove("disabled");
    }

    const resetForm = () => {
        _nameText.value = "";
        _symbolText.value = "";
    }

    const makePlayer1 = () => {
        enableForm();
        const buttonPress = _saveButton.addEventListener('click', () => {
            gameController.player1 = PlayerFactory(_nameText.value, _symbolText.value);
            if((gameController.player1.name !== "") && (gameController.player1.boardSymbol !== "")){
                disableForm();
            }
        })
    }

    const makePlayer2 = () => {
        enableForm();
        const buttonPress = _saveButton.addEventListener('click', () => {
            gameController.player2 = PlayerFactory(_nameText.value, _symbolText.value);
            if((gameController.player2.name !== "") && (gameController.player2.boardSymbol !== "")){
                disableForm();
            }
        })
    }

    disableForm();
    return {makePlayer1, makePlayer2, disableForm, enableForm, resetForm}
};


// Global UI control
const uiController = (() => {
    const p1 = document.getElementById("player1-menu");
    const p2 = document.getElementById("player2-menu");
    const gameButton = document.getElementById("start-reset");
    const currentPlayer = document.getElementById("current-player");

    const p1UI = PlayerUI(p1);
    const p2UI = PlayerUI(p2);

    const p1EnableUI = () => {p1UI.enableForm();}
    const p1DisableUI = () => {p1UI.disableForm();}
    const p2EnableUI = () => {p1UI.enableForm();}
    const p2DisableUI = () => {p2UI.disableForm();}

    const makePlayer1 = () => {
        p1EnableUI();
        p1UI.makePlayer1();
    }

    const makePlayer2 = () => {
        p2EnableUI();
        p2UI.makePlayer2();
    }

    const startGameButton = () => gameButton.addEventListener('click', () => {
        if (gameController.win === false) {
            if (gameController.turnCount === 0) {
                gameController.playGame();
            }
        } else {
            p2UI.resetForm();
            p1UI.resetForm();
            gameController.player1 = {name: "", boardSymbol: "", ai: false};
            gameController.player2 = {name: "", boardSymbol: "", ai: false};
            gameBoard.disableBoaard();
            gameController.initializeGame();
            updateStartButton();
            const banner = document.getElementById("current-player-label");
            banner.textContent = "Enter Player Stats"
            startGameButton();
        }
    })

    const updateStartButton = () => {
        if (gameController.win === false){
            gameButton.textContent = "Start Game!";
        } else {
            gameButton.textContent = "Reset Game";
        }
    }

    const updateCurrentPlayer = (player) => {
        const banner = document.getElementById("current-player-label");
        banner.textContent = "Current Player:"
        currentPlayer.textContent = player.name;
    }

    return {
        makePlayer1,
        makePlayer2,
        startGameButton,
        updateCurrentPlayer,
        updateStartButton,
        currentPlayer,
    }
})();

gameController.initializeGame();
uiController.startGameButton();




