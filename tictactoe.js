const readline = require('readline')




let board = [  // 3x3 board
    [' ',' ',' '],
    [' ',' ',' '],
    [' ',' ',' ']
]

let currentPlayer = 'X';

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X"
}

function checkWinner(){
    for (let i = 0; i < 3; i++) {
        if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' '){
            return true
        }
    }
    for (let j = 0; j < 3; j++) {
        if(board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== ' '){
            return true
        }
    }
    if((board[0][0]===board[1][1] && board[1][1]===board[2][2] && board[0][0] !== ' ') || 
    (board[0][2]===board[1][1] && board[1][1]===board[2][0] && board[0][2] !== ' ') ){
        return true
    }
    else{
        return false
    }
}

function makeMove(row,col){
    if(board[row][col] == ' '){
      board[row][col] = currentPlayer;
      if(checkWinner()){
        console.log(currentPlayer + " Wins !");
        process.exit();
      }else if(board.flat().every(cell => cell !== ' ')){  // check board
        console.log("Draw!");
        process.exit();
      }
      else{
        changePlayer();
      }
    }else{
        console.log('This cell is already filled')
    }
}

function displayBoard(){
    for(let row of board){
        console.log(row.join(' | '));
    }
}
console.log("Welcome To The Game !");
displayBoard();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function gameLoop(){
    rl.question('Enter row number  (0-2):', (row) => {
        rl.question('Enter column number (0-2):', (col) => {
            makeMove(parseInt(row), parseInt(col)) // Player move
            displayBoard(); //Board Update
            gameLoop(); // Refresh game
        })
    })
}

gameLoop()
