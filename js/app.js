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
const dateOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
}
const today = new Date().toLocaleDateString('en-US', dateOptions)

/*---------------------------- Variables (state) ----------------------------*/
let chosenLevel
let gameLength = 10
let counter
let playTimeSeconds
let playTimeDisplay
let results = []
let resultsInEmoji = []
let resultsInEmojiString = ""
let answeredCount
let remainingCount
let progress
let score
let accuracy

let JSONData

let currentImageEl
let imageTouchEl
let images = []
let imageCards = []

let currentImageIndex = 0

let currentImageCard
let correctAnswer
let incorrectAnswer
let answerA
let answerB

let shareResults = {}

/*------------------------ Cached Element References ------------------------*/
/* Landing */
const landingParentEl = document.querySelector('.landing-parent')
const landingEl = document.querySelector('.landing')
const dateEl = document.querySelector('.date')
const easyBtn = document.querySelector('.easy-btn')
const medBtn = document.querySelector('.med-btn')
const hardBtn = document.querySelector('.hard-btn')

/* Game */
const gameParentEl = document.querySelector('.game-parent')
const gameEl = document.querySelector('.game')
const levelEl = document.querySelector('.level')
const timerEL = document.querySelector('.timer')
const statsEl = document.querySelector('.stats')
const completeEl = document.querySelector('#complete')
const completeCountEl = document.querySelector('#complete-count')
const incompleteEl = document.querySelector('#incomplete')
const totalCountEl = document.querySelector('#total-count')
const answerAEl = document.querySelector('#answer-a')
const answerBEl = document.querySelector('#answer-b')
const imageEl = document.querySelector('.image')
const imageCreditEl = document.querySelector('.credit')
const backBtn = document.querySelector(".back-btn");

const shareBtn = document.querySelector(".share-btn");


/* Results */
const resultsParentEl = document.querySelector('.results-parent')
/*----------------------------- Event Listeners -----------------------------*/
easyBtn.addEventListener('click', render)
medBtn.addEventListener('click', render)
hardBtn.addEventListener('click', render)

backBtn.addEventListener('click', leave)
// document.querySelector('.back-btn').addEventListener('click',showModal)
// document.querySelector(".keep-playing-btn").addEventListener("click", hideModal)
// document.querySelector(".leave-btn").addEventListener("click", leave)

shareBtn.addEventListener('click', async () => {
  try {
    await navigator.share(shareResults)
  } catch (err) { 
    console.log(err) 
  }
});

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  dateEl.textContent = today
  easyBtn.textContent = levels[0].name
  medBtn.textContent = levels[1].name
  hardBtn.textContent = levels[2].name

  remainingCount = gameLength - answeredCount
  score = 0
  timerEL.textContent = playTimeDisplay
  completeEl.flexGrow = 0
  incompleteEl.flexGrow = remainingCount
  totalCountEl.textContent = gameLength

  handleData()
}

function handleData(params) {
  fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
      JSONData = data
      // render()
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
}

function render(click) {
  chosenLevel = parseInt(click.target.id)
  levelEl.textContent = levels[chosenLevel].name
  playTimeSeconds = -1
  playTimeDisplay = '0:00'
  results = []
  resultsInEmoji = []
  resultsInEmojiString = ""
  shareResults = {}
  hideLanding()
  getLevelImages()
  buildImageCards()
  updateAnswerOptions(0)
  addTouchToCurrentImageCard()
  showGame()
  startGame()
}

function hideLanding() {
  landingParentEl.classList.add('fade-out-1s')
}

function showGame() {
  landingParentEl.classList.add('display-none')
  gameParentEl.classList.remove('display-none')
  gameParentEl.classList.remove('fade-out-1s')
  gameParentEl.classList.add('fade-in-1s-delayed-1s')
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

function getLevelImages() {
  images = []
  let count = 0
  for (const image of JSONData) {
    if (image.levelValue === chosenLevel && count < gameLength) {
      images.push(image)
      count++
    }
  }
  return images
}

function buildImageCards() {
  const imageCardsContainer = document.getElementById('image-cards')
  if (imageCardsContainer) {
    for (const image of images) {
      const imageCard = document.createElement('div')
      imageCard.classList.add('image-card')
      const imageElement = document.createElement('img')
      imageElement.classList.add('image')
      imageElement.setAttribute('draggable', false)
      imageElement.src = image.url
      const creditDiv = document.createElement('div')
      creditDiv.classList.add('credit')
      creditDiv.innerHTML = image.credit
      imageCard.appendChild(imageElement)
      imageCard.appendChild(creditDiv)
      imageCardsContainer.appendChild(imageCard)
    }
  } else {
    console.error(`Image cards container not found in the DOM`)
  }
  imageCards = [...document.querySelectorAll('.image-card')]
  let firstImageCard = imageCards[0]
  firstImageCard.classList.add('current')
  let nextImageCard = imageCards[1]
  nextImageCard.classList.add('next')
}

function leave() {
  stopTimer()
  landingParentEl.classList.remove("fade-out-1s", "display-none");
  landingParentEl.classList.add("fade-in-1s");
  gameParentEl.classList.remove("fade-in-1s-delayed-1s");
  gameParentEl.classList.add("fade-out-1s", "display-none");
}

function updateAnswerOptions(imageIndex) {
  currentImageCard = images[imageIndex]
  correctAnswer = currentImageCard.correct
  incorrectAnswer = currentImageCard.incorrects[0]
  const answers = [correctAnswer, incorrectAnswer]
  answers.sort(() => Math.random() - 0.5)
  answerA = answers[0]
  answerAEl.textContent = answers[0]
  answerB = answers[1]
  answerBEl.textContent = answers[1]
}

function addTouchToCurrentImageCard() {
  const currentImageIndex = imageCards.findIndex(
    (el) => el.classList.contains('current')
  )
  currentImageEl = imageCards[currentImageIndex]
  imageTouchEl = Hammer(currentImageEl)
  imageTouchEl.on('swipeleft swiperight', answerHandler)
}

function updateStats() {
  answeredCount = results.length
  completeCountEl.textContent = answeredCount
  completeEl.style.flexGrow = answeredCount
  remainingCount = gameLength - answeredCount
  incompleteEl.style.flexGrow = remainingCount
  progress = answeredCount / gameLength
  score = results.reduce((prev, curr) => {
    return prev + curr
  }, 0)
  accuracy = score / answeredCount
}

function answerHandler(event) {
  if (event.type === 'swipeleft') {
    currentImageEl.classList.add('answered-a')
    if (answerA == correctAnswer) {
      results.push(1)
    } else if (answerA == incorrectAnswer) {
      results.push(0)
    } else { console.log(`wha?`); }
  } else if (event.type === 'swiperight') {
    currentImageEl.classList.add('answered-b')
    if (answerB == correctAnswer) {
      results.push(1)
    } else if (answerB == incorrectAnswer) {
      results.push(0)
    } else { console.log(`wha?`); }
  } else {
    console.log(`This else logic shouldn't ever be possible, fix it.`);
  }
  updateStats()
  updateImageClasses()
  remainingCount = gameLength - answeredCount
  completeEl.flexGrow = results.length
  incompleteEl.flexGrow = remainingCount
  if (answeredCount == gameLength) {
    totalCountEl.textContent = ""
  }
}

function updateImageClasses() {
  const currentImageIndex = imageCards.findIndex(
    (el) => el.classList.contains('current')
  )
  const currentImage = imageCards[currentImageIndex]
  if (currentImageIndex + 1 <= imageCards.length) {
    currentImage.classList.remove('current')
    Hammer(currentImage).off('swipeleft swiperight')
  }
  if (currentImageIndex + 1 < imageCards.length) {
    const nextImage = imageCards[currentImageIndex + 1]
    nextImage.classList.add('current')
    nextImage.classList.remove('next')
    addTouchToCurrentImageCard()
    updateAnswerOptions(currentImageIndex + 1)
  } else {
    console.log("no more cards, finishing game.");
    finishGame()
  }
  if (currentImageIndex + 2 < imageCards.length) {
    const nextNextImage = imageCards[currentImageIndex + 2]
    nextNextImage.classList.add('next')
  }
}

function finishGame() {
  stopTimer()
  emojiResults()
  shareResults = {
    text: `Spot On ${levels[chosenLevel].name} #1 \\n⏱️ ${playTimeDisplay} \\n${resultsInEmojiString}`
  }
  showResults()
}

function showResults() {
  gameParentEl.classList.add('display-none')
  gameParentEl.classList.add('fade-out-1s')
  gameParentEl.classList.remove('fade-in-1s-delayed-1s')
  resultsParentEl.classList.remove('display-none')
  resultsParentEl.classList.add('fade-in-1s-delayed-1s')
}


// function showModal() {
//   document.getElementById("leave-modal").classList.remove("hidden");
// }

// function hideModal() {
//   document.getElementById("leave-modal").classList.add("hidden");
// }

function emojiResults() {
  results.forEach(result => {
    if (result == 1) {
      resultsInEmoji.push("🟢")
    } else if (result == 0) {
      resultsInEmoji.push("🔴")
    } else {console.log(`Result value didn't match 1 or 0`)}
  })
  emojiResultsToString()
}

function emojiResultsToString() {
  for (let i = 0; i < resultsInEmoji.length; i += 5) {
    let emojiGroup = resultsInEmoji.slice(i, i + 5).join('')
    resultsInEmojiString += emojiGroup + (i + 5 < resultsInEmoji.length ? "\n" : '')
  }
  // return resultsInEmojiString
}