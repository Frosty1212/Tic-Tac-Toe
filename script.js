//this took me all day
const X_CLASS = 'x'
const O_CLASS = 'o'
const cellElements = document.querySelectorAll('[data-cell')
const winningMessageElement = document.getElementById('winningMessage')
const playAgainButton = document.getElementById('playAgain')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
//everything above makes sure all the javascript is linked in the html

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],    
    [6, 7, 8],    
    [3, 4, 5],    
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],                    
]

let oTurn
startGame()

playAgainButton.addEventListener('click', startGame)

function startGame() {
    OTurn = false
cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)   
    cell.addEventListener('click', handleClick, { once: true})//makes it click once
    })
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (ifDraw()) {
        endGame(true) 
    }else {
    swapTurns()
    }
}

function endGame(draw){
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}
function ifDraw() { // checks if all cell elements were filled
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass) { //places down mark based on curentClass
    cell.classList.add(currentClass)
}
function swapTurns() { //swaps turns
    oTurn = !oTurn
}
function checkWin(currentClass) { // checks if the same is class is atleast one of the index's on the array
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}