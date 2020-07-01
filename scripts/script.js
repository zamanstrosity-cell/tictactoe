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
let circle = '<i class="far fa-circle"></i>';
let strike = '<i class="fas fa-times"></i>';
//objects

const gameBoard = (cells, playerNames) => {
    let board = [...cells];
    let playerOne = {
        name: playerNames[0].value,
        sign: 'x'
    };
    let playerTwo = {
        name: playerNames[1].value,
        sign: 'o'
    }
    let turn = 'x';
    const drawSign = cell => {
        if(turn == 'o'){
            cell.innerHTML = circle;
            turn = 'x'
        }else if(turn == 'x'){
            cell.innerHTML = strike;
            turn = 'o';
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
        return winPatterns.some(combination => {
            return combination.every(index => {
                return board[index].innerHTML.contains(circle || strike);
            })
        })
    };
    const checkForDraw = board => {
        return board.every(cell => {
            return cell.innerHTML !== '';
        })
    }
    board.forEach(cell => {
        cell.addEventListener('click', (e) => {
            drawSign(e.target);
            if(checkForWin(board)){
                winMessage.innerHTML = turn === 'o' ? `${playerOne.name} or ${playerOne.sign} WINS!` : `${playerTwo.name} or ${playerTwo.sign} WINS!`;
                winModal.style.visibility = "visible";
            }else if (checkForDraw(board)){
                winMessage.innerHTML = "THAT'S A DRAW";
                winModal.style.visibility = "visible";
            }
        }, {once: true})
    })
}

    
//functions
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
    let newBoard = gameBoard(cells, playerNames);
    startModal.style.visibility = 'hidden';
}

reset.onclick = () => {
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    let newBoard = gameBoard(cells, playerNames);
    winModal.style.visibility = 'hidden';
}