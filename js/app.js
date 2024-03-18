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
let playTime = 0
let results = [1,0,1,0,1,1]
let answeredCount = results.length
let progress = answeredCount / gameLength
let score = 0
let accuracy = score / answeredCount

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
  render()
}

init()

function render() {

}

// function startTimer(params) {
//   counter = setInterval(updateTimer, 1000);
// }

// function updateTimer() {
//   playTime += 1
// }

// function stopTimer() {
//   cancelInterval(counter)
// }

function countScore() {
  let sum = results.reduce((prev,curr) => {
    return prev + curr
  },0)
  score = sum
}