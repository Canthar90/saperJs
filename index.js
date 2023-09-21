let numberOfMines = 10
let xPoolsCount = 8
let yPollsCount = 8
let timer = 10
let numberOfMineCovers = 10
let interval
let gameStartFlag = true
let gameSegments = []
let gameBoard =  document.getElementById("game-grid")

const rem = Number(parseFloat(getComputedStyle(document.documentElement).fontSize)) 


if (!interval) {
    interval = setInterval(gameLogic, 1000)
}

function generateOneSegment(xPosition, yPosition){
    
    let newSegment = document.createElement("button")
    
    newSegment.style.width = 2*rem
    newSegment.style.cursor = "pointer"
    newSegment.style.height = 2*rem
    newSegment.style.gridColumnStart = yPosition
    newSegment.style.gridRowStart = xPosition

    gameSegments.push(newSegment)
    gameBoard.appendChild(newSegment)
    
}

function generateGameGrid() {
     for (let x = 1; x < xPoolsCount+1 ; x++) {
        
        for(let y = 1; y < yPollsCount+1; y++) {
            
            generateOneSegment(x, y)
        }
     }
     gameStartFlag = false
}


function gameLogic(){
    if (gameStartFlag){
        generateGameGrid()
    }
}
