let numberOfMines = 10
let xPoolsCount = 8
let yPollsCount = 8
let timer = 10
let numberOfMineCovers = 8
let interval
let gameStartFlag = true
let gameCountdownFlag = true
let gameEnded = false
let gameSegments = []
let gameBoard =  document.getElementById("game-grid")
let mineSegments = []
let minutes = 1     
let seconds = 20

const rem = Number(parseFloat(getComputedStyle(document.documentElement).fontSize)) 


if (!interval) {
    gameLogic()
    interval = setInterval(gameLogic, 1000)
}

function generateOneSegment(xPosition, yPosition){
    
    let newSegment = {
        isAbomb: false,
        x: xPosition,
        y: yPosition,
        htmlElem: undefined
    }

   newSegment.htmlElem = document.createElement("button")
    
    newSegment.htmlElem.style.width = 2*rem
    newSegment.htmlElem.style.cursor = "pointer"
    newSegment.htmlElem.style.height = 2*rem
    newSegment.htmlElem.style.gridColumnStart = yPosition
    newSegment.htmlElem.style.gridRowStart = xPosition


    gameSegments.push(newSegment)
    gameBoard.appendChild(newSegment.htmlElem)
    
}

function generateRandomMineIndexes(quantity) {
    
    const arr = []
    while(arr.length < quantity){
        var candidateInt = Math.floor(Math.random() * gameSegments.length)
        if(arr.indexOf(candidateInt) === -1) arr.push(candidateInt)
    }
    return(arr)
    }
 

function minesGenerating(randomNumbersList){
    

    for (number in randomNumbersList){
        let segmentWitchMine = gameSegments[randomNumbersList[number]]
        segmentWitchMine.isAbomb = true
        segmentWitchMine.htmlElem.style.backgroundColor = "red"
        mineSegments.push(segmentWitchMine)
      
    }
}

function mineGeneration(){
    randomNumbers =  generateRandomMineIndexes(numberOfMines)
    minesGenerating(randomNumbers)
    gameStartFlag = false

}

function swapCounters(){
    
    let mineCoverCount = `${numberOfMineCovers}`.padStart(3,0)
    document.getElementById("mine-cover-count").innerHTML = mineCoverCount

    let timerDisplay = `${minutes}`.padStart(2,0) + ":" + `${seconds}`.padStart(2,0)
    document.getElementById("game-timer").innerHTML = timerDisplay
}


function generateGameGrid() {
     for (let x = 1; x < xPoolsCount+1 ; x++) {
        
        for(let y = 1; y < yPollsCount+1; y++) {
            
            generateOneSegment(x, y)
        }
     }
    mineGeneration()
     
}

function timeCountdown(){
    if (seconds > 0 ){
        seconds--
    }else if (seconds === 0 && minutes > 0){
        seconds = 59
        minutes--
    }else if(seconds === 0 && minutes === 0){
        gameCountdownFlag = false
        gameEnded = true
        console.log(gameEnded)
    }
}


function gameLogic(){
    if (gameStartFlag){
        generateGameGrid()
        swapCounters()
    }else if(gameCountdownFlag) {
        timeCountdown()
        swapCounters()
    }

}
