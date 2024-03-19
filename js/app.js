/*-------------------------------- Constants --------------------------------*/
const levels = {
  "easy": {
    "value": 0,
    "name": "Newb"
  },
  "medium": {
    "value": 1,
    "name": "Seasoned"
  },
  "hard": {
    "value": 2,
    "name": "Savant"
  }
}


/*---------------------------- Variables (state) ----------------------------*/
let today = new Date().toLocaleDateString()
let chosenLevel
let gameLength = 25
let playTime
let results = []
let answeredCount
let progress
let score
let accuracy

/*------------------------ Cached Element References ------------------------*/
const dateEl = document.querySelector('.date')
const easyBtn = document.querySelector('.easy-btn')
const medBtn = document.querySelector('.med-btn')
const hardBtn = document.querySelector('.hard-btn')


/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
function init() {
  dateEl.textContent = today
  easyBtn.textContent = levels.easy.name
  medBtn.textContent = levels.medium.name
  hardBtn.textContent = levels.hard.name
  playTime = 0
  results = []
  score = 0
  render()
}

init()

function render() {

}

function startTimer(params) {
  counter = setInterval(updateTimer, 1000);
}

function updateTimer() {
  playTime += 1
}

function stopTimer() {
  clearInterval(counter);
}

function updateStats() {
  answeredCount = results.length
  progress = answeredCount / gameLength
  score = results.reduce((prev,curr) => {
    return prev + curr
  },0)
  accuracy = score / answeredCount
}



/*-------------------------------- Temp functions for testing --------------------------------*/

function seedProgress(params) {
  results.push(1,0,0,1,1,1,0,1,0,1)
}

function logVariables() {
  seedProgress()
  updateScore()
  console.log(`results: ${results}`);
  console.log(`answeredCount: ${answeredCount}`);
  console.log(`progress: ${progress}`);
  console.log(`score: ${score}`);
  console.log(`accuracy: ${accuracy}`);
}