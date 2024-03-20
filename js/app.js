/*-------------------------------- Constants --------------------------------*/
const levels = {
  "0": {
    "value": 0,
    "difficulty": "easy",
    "name": "Newb"
  },
  "1": {
    "value": 1,
    "difficulty": "medium",
    "name": "Seasoned"
  },
  "2": {
    "value": 2,
    "difficulty": "hard",
    "name": "Savant"
  }
}


/*---------------------------- Variables (state) ----------------------------*/
let today = new Date().toLocaleDateString()
let chosenLevel
let gameLength = 10
let playTimeSeconds
let playTimeDisplay
let results = []
let answeredCount
let remainingCount
let progress
let score
let accuracy

/*------------------------ Cached Element References ------------------------*/
/* Landing */
const landingEl = document.querySelector('.landing')
const dateEl = document.querySelector('.date')
const easyBtn = document.querySelector('.easy-btn')
const medBtn = document.querySelector('.med-btn')
const hardBtn = document.querySelector('.hard-btn')

/* Game */
const gameEl = document.querySelector('.game')
const levelEl = document.querySelector('.level')
const timerEL = document.querySelector('.timer')
const statsEl = document.querySelector('.stats')
const completeEl = document.querySelector('.complete')
const incompleteEl = document.querySelector('.incomplete')
const answerAEl = document.querySelector('#answer-a button')
const answerBEl = document.querySelector('#answer-b button')
const imageEl = document.querySelector('.image img')

/* Results */

/*----------------------------- Event Listeners -----------------------------*/
easyBtn.addEventListener('click',finalRender)
medBtn.addEventListener('click',finalRender)
hardBtn.addEventListener('click',finalRender)


/*-------------------------------- Functions --------------------------------*/
function init() {
  dateEl.textContent = today
  easyBtn.textContent = levels[0].name
  medBtn.textContent = levels[1].name
  hardBtn.textContent = levels[2].name
  playTimeSeconds = 0
  playTimeDisplay = "0:00"
  results = []
  score = 0
  preRender()
}

init()

function preRender() {
  timerEL.textContent = playTimeDisplay
  completeEl.flexGrow = 0
  incompleteEl.flexGrow = gameLength
  answerAEl.textContent = "Pear"
  answerBEl.textContent = "Apple"
  imageEl.src = "/img/apple.jpeg"
}

async function finalRender(click) {
  chosenLevel = click.target.id
  console.log(click.target.id);
  levelEl.textContent = levels[chosenLevel].name
  hideLanding()
  await delay(1000)
  showGame()
  await delay(1000)
  startGame()
}

function startGame() {
  startTimer()
}

function startTimer() {
  counter = setInterval(updateTimer, 1000)
}

function updateTimer() {
  playTimeSeconds += 1
  const minutes = Math.floor(playTimeSeconds / 60)
  const seconds = playTimeSeconds % 60
  playTimeDisplay = minutes.toString().padStart(1, '0') + ':' + seconds.toString().padStart(2, '0')
  timerEL.textContent = playTimeDisplay
}

function stopTimer() {
  clearInterval(counter)
}

function updateStats() {
  answeredCount = results.length
  // completeEl.
  completeEl.textContent = answeredCount
  remainingCount = gameLength - answeredCount
  incompleteEl.textContent = remainingCount
  progress = answeredCount / gameLength
  score = results.reduce((prev,curr) => {
    return prev + curr
  },0)
  accuracy = score / answeredCount
}

function hideLanding() {
  landingEl.classList.add('fade-out-1s')
}

function showGame() {
  gameEl.classList.add('fade-in-1s')  
}

/*-------------------------------- Helper functions  --------------------------------*/

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
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