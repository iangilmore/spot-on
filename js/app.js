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
let playTimeSeconds
let playTimeDisplay
let results = []
let answeredCount
let progress
let score
let accuracy

/*------------------------ Cached Element References ------------------------*/
// Landing
const landingEl = document.querySelector('.landing')
const dateEl = document.querySelector('.date')
const easyBtn = document.querySelector('.easy-btn')
const medBtn = document.querySelector('.med-btn')
const hardBtn = document.querySelector('.hard-btn')

// Game
const timerEL = document.querySelector('.timer')

// Results

/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
function init() {
  dateEl.textContent = today
  easyBtn.textContent = levels.easy.name
  medBtn.textContent = levels.medium.name
  hardBtn.textContent = levels.hard.name
  playTimeSeconds = 0
  // timerEL.textContent = playTimeDisplay
  results = []
  score = 0
  render()
}

init()

function render() {

}

function startTimer(params) {
  counter = setInterval(updateTimer, 1000)
}

function updateTimer() {
  playTimeSeconds += 1
  const minutes = Math.floor(playTimeSeconds / 60)
  const seconds = playTimeSeconds % 60
  playTimeDisplay = minutes.toString().padStart(1, '0') + ':' + seconds.toString().padStart(2, '0')
  console.log(`playTimeDisplay: ${playTimeDisplay}`)
}

function stopTimer() {
  clearInterval(counter)
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

function demoInConsole() {
  seedProgress()
  startTimer()
  logVariables()
}

function seedProgress(params) {
  results.push(1,0,0,1,1,1,0,1,0,1)
}

function logVariables() {
  updateStats()
  console.log(`results: ${results}`);
  console.log(`answeredCount: ${answeredCount}`);
  console.log(`progress: ${progress}`);
  console.log(`score: ${score}`);
  console.log(`accuracy: ${accuracy}`);
}