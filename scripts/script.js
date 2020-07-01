//query selectors
const startGame = document.querySelector("#start-game");
const startModal = document.querySelector(".start-modal");
const gameForm = document.querySelector("form");
const cancel = document.querySelector(".fa-times-circle");
const cells = [...document.querySelectorAll(".cell")];
const playerNames = [...document.querySelectorAll('.name')];
const winModal = document.querySelector('.winner-modal');
const winMessage = document.querySelector('.win-message');
const reset = document.querySelector('#reset-game');
//variables
let circle = '<i class="far fa-circle" aria-hidden="true"></i>';
let strike = '<i class="fas fa-times" aria-hidden="true"></i>';
//objects

const gameBoard = (cells, playerNames) => {
    let board = [...cells];
    let playerOne = {
        name: playerNames[0].value,
        sign: 'X'
    };
    let playerTwo = {
        name: playerNames[1].value,
        sign: 'O'
    }
    let turn = 'x';
    const drawSign = cell => {
        if(turn == 'o'){
            cell.innerHTML = circle;
            turn = 'x'
            board.forEach(cell => console.log(cell.innerHTML))
        }else if(turn == 'x'){
            cell.innerHTML = strike;
            turn = 'o';
            board.forEach(cell => console.log(cell.innerHTML))
        }
    };
    const checkForWin = board => {
        let winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        if(winPatterns.some(combination => combination.every(index => board[index].innerHTML === strike ||
            combination.every(index => board[index].innerHTML === circle)))){
            winMessage.innerHTML = turn === 'o' ? `${playerOne.name} or "${playerOne.sign}" WINS!` : `${playerTwo.name} or "${playerTwo.sign}" WINS!`;
            winModal.style.visibility = "visible";
            return true;
        }
    };
    const checkForDraw = board => {
        if(!checkForWin(board)){
            if(board.every(cell => cell.innerHTML !== '')){
            winMessage.innerHTML = "THAT'S A DRAW";
            winModal.style.visibility = "visible";
        }
    }
    }
    board.forEach(cell => {
        cell.addEventListener('click', (e) => {
            drawSign(e.target);
            checkForWin(board);
            checkForDraw(board)
        }, {once: true})
    })
}
//event listeners
startGame.onclick = () => {
    startModal.style.visibility = "visible";
}

cancel.onclick = () => {
    startModal.style.visibility = "hidden";
}

gameForm.onsubmit = () => {
    event.preventDefault();
    cells.forEach(cell => {
        cell.innerHTML = '';
    })
    gameBoard(cells, playerNames);
    startModal.style.visibility = 'hidden';
}

reset.onclick = () => {
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    gameBoard(cells, playerNames);
    winModal.style.visibility = 'hidden';
}