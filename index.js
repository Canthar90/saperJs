let numberOfMines = 10
let xPoolsCount = 8
let yPollsCount = 8
let timerMinutes = 10
let timerSeconds = 0
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
let gameStateEmoji = document.getElementById("game-state-emoji")
let gameResetButton = document.getElementById("game-emoji")
let notABombSegments


function gameReset() {
    gameStartFlag = true
    gameCountdownFlag = true
    gameEnded = false
    mineSegments = []
    gameSegments=[]
    minutes = timerMinutes
    seconds = timerSeconds
    gameStateEmoji.innerHTML = "😊"
}



const rem = Number(parseFloat(getComputedStyle(document.documentElement).fontSize)) 


if (!interval) {
    gameLogic()
    interval = setInterval(gameLogic, 1000)
}

function generateOneSegment(xPosition, yPosition, id){
    
    let newSegment = {
        isAbomb: false,
        x: xPosition,
        y: yPosition,
        htmlElem: undefined,
        icon: 0,
        id: id,
        hidden: true
    }

   newSegment.htmlElem = document.createElement("button")
    
    newSegment.htmlElem.style.width = 2*rem
    newSegment.htmlElem.style.cursor = "pointer"
    newSegment.htmlElem.style.height = 2*rem
    newSegment.htmlElem.style.gridColumnStart = yPosition
    newSegment.htmlElem.style.gridRowStart = xPosition
    newSegment.htmlElem.style.backgroundColor = "#D2E0FB" 
    newSegment.htmlElem.id = id
    newSegment.htmlElem.onclick = function action(button){actionAfterClick(button)}


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
        // segmentWitchMine.htmlElem.style.backgroundColor = "red"
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
    let id = 1
     for (let x = 1; x < xPoolsCount+1 ; x++) {
        
        for(let y = 1; y < yPollsCount+1; y++) {
            
            generateOneSegment(x, y, id)
            id++
        }
     }
    mineGeneration()
     
}

function gameOver(){
    gameCountdownFlag = false
    gameEnded = true
    gameStateEmoji.innerHTML = "😔"
}

function timeCountdown(){
    if (seconds > 0 ){
        seconds--
    }else if (seconds === 0 && minutes > 0){
        seconds = 59
        minutes--
    }else if(seconds === 0 && minutes === 0){
        gameOver()
    }
}

function bombSegmentsRemoval() {
    let cleanedArray = gameSegments
    
    for (segment in mineSegments){
        let value = mineSegments[segment]
        let index = cleanedArray.indexOf(value)
        cleanedArray.splice(index, 1) 
    }
    return cleanedArray
}


function localizingNearMineSegments(x, y){
    
    for (segment in notABombSegments){
        
        let seg = notABombSegments[segment]

        if ((seg.x === x+1 && seg.y === y+1)||(seg.x === x-1 && seg.y === y-1)
        ||(seg.x === x+1 && seg.y === y-1)|| (seg.x === x-1 && seg.y === y+1)
        || (seg.x === x && seg.y === y-1)|| (seg.x === x && seg.y === y+1)
        || (seg.x === x+1 && seg.y === y)|| (seg.x === x-1 && seg.y === y))
        {
            
            seg.icon++
           
            // seg.htmlElem.innerHTML = `${seg.icon}`
        }
    }
}

function creatingMarkers(){
    for (mine in mineSegments) {
        let mineSegmentColumn = mineSegments[mine].y
        let mineSegmentRow = mineSegments[mine].x
        localizingNearMineSegments(mineSegmentRow, mineSegmentColumn)
    }
}

function generateNumbers() {
    notABombSegments = bombSegmentsRemoval()
    creatingMarkers()
}

function mineStepped(){
    for (mine in mineSegments){
        let currentMine = mineSegments[mine]
        currentMine.htmlElem.style.backgroundColor = "red"
        currentMine.htmlElem.innerHTML = "💣"
        gameOver()
    }
}

function sequenceForNexUncovering(segment){
let nextSegments = []
    if (segment.x === 1 && segment.y === 1){
        // right left corner
        let nextSegmentRight = gameSegments.find(item => item.x === segment.x + 1 && item.y === segment.y)
        let nextSegmentBottom = gameSegments.find(item => item.x === segment.x && item.y === segment.y + 1)
        nextSegments = [nextSegmentRight, nextSegmentBottom]
        
        nextUncovering(nextSegments)

    } else if (segment.x === 1 && segment.y > 1 && segment.y < yPollsCount ){
        // up edge
        let nextSegmentRight = gameSegments.find(item => item.x === segment.x + 1 && item.y === segment.y) 
        let nextSegmentBottom = gameSegments.find(item => item.x === segment.x && item.y === segment.y + 1)
        let nextSegmentLeft = gameSegments.find(item => item.x === segment.x && item.y === segment.y-1)
        nextSegments = [nextSegmentRight, nextSegmentBottom, nextSegmentLeft]
        nextUncovering(nextSegments)

    } else if (segment.x > 1 && segment.x < xPoolsCount && segment.y > 1 && segment.y < yPollsCount){
        // general middle
        let nextSegmentRight = gameSegments.find(item => item.x === segment.x && item.y === segment.y +1) 
        let nextSegmentBottom = gameSegments.find(item => item.x+1 === segment.x && item.y === segment.y )
        let nextSegmentLeft = gameSegments.find(item => item.x === segment.x && item.y === segment.y-1)
        let nextSegmentUp = gameSegments.find(item => item.x === segment.x-1 && item.y === segment.y)
        nextSegments = [nextSegmentRight, nextSegmentBottom, nextSegmentLeft, nextSegmentUp]
        nextUncovering(nextSegments)

    } else if (segment.x === xPoolsCount && segment.y > 1 && segment.y < yPollsCount){
        // bottom board edge
        let nextSegmentUp = gameSegments.find(item => item.x === segment.x-1 && item.y === segment.y)
        let nextSegmentLeft = gameSegments.find(item => item.x === segment.x && item.y === segment.y-1)
        let nextSegmentRight = gameSegments.find(item => item.x === segment.x  && item.y === segment.y+1)
        nextSegments = [nextSegmentUp, nextSegmentRight, nextSegmentLeft]
        nextUncovering(nextSegments)

    } else if(segment.x > 1 && segment.x < xPoolsCount && segment.y === 1){
        // left board edge
        console.log("left edge")
        let nextSegmentUp = gameSegments.find(item => item.x === segment.x-1 && item.y === segment.y)
        let nextSegmentDown = gameSegments.find(item => item.x === segment.x+1   && item.y === segment.y)
        let nextSegmentRight = gameSegments.find(item => item.x === segment.x && item.y === segment.y+1)
        nextSegments = [nextSegmentDown, nextSegmentRight, nextSegmentUp]
        nextUncovering(nextSegments)
    }
    
}

function nextUncovering(segmentsList){
    for (seg in segmentsList){
        console.log("segmenting")
        uncoverSegments(segmentsList[seg])
    }
}

function uncoverSegments(segment){
    if (segment.icon === 0 && segment.hidden){
        segment.htmlElem.style.backgroundColor = "white"
        segment.hidden = false
        sequenceForNexUncovering(segment)
       

    }else if(segment.hidden) {
        segment.htmlElem.style.backgroundColor = "white"
        segment.htmlElem.innerHTML = segment.icon
        segment.hidden = false
    }
}

function actionAfterClick(button){
    if (gameEnded) return

    
    let searchedId = Number(button.target.id)
    let clickedSegment = gameSegments.find(item => Number(item.id) === searchedId)
    
    if (!clickedSegment) {
        mineStepped()
    }else {
        uncoverSegments(clickedSegment)
    }

}


function gameLogic(){
    if (gameEnded){
        return
    }

    if (gameStartFlag){
        generateGameGrid()
        swapCounters()
        generateNumbers()
    }else if(gameCountdownFlag) {
        timeCountdown()
        swapCounters()
        
    }

}
