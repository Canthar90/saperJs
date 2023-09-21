let numberOfMines = 10
let xPoolsCount = 8
let yPollsCount = 8
let timer = 10
let numberOfMineCovers = 10
let interval
let gameStartFlag = true
let gameSegments = []
let gameBoard =  document.getElementById("game-grid")
let mineSegments = []

const rem = Number(parseFloat(getComputedStyle(document.documentElement).fontSize)) 


if (!interval) {
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
        var candidateInt = Math.floor(Math.random() * gameSegments.length) + 1
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
    console.log(randomNumbers)
    minesGenerating(randomNumbers)
    gameStartFlag = false

}

function generateGameGrid() {
     for (let x = 1; x < xPoolsCount+1 ; x++) {
        
        for(let y = 1; y < yPollsCount+1; y++) {
            
            generateOneSegment(x, y)
        }
     }

    //  minesGenerating()
    mineGeneration()
     
}


function gameLogic(){
    if (gameStartFlag){
        generateGameGrid()
        
    }

}
