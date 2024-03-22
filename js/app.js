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

let currentImageIndex = 0 // Always starts at 0, will eventually update after each answer is submitted

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


/* Results */
//TKTKTK

/*----------------------------- Event Listeners -----------------------------*/
easyBtn.addEventListener('click',render)
medBtn.addEventListener('click',render)
hardBtn.addEventListener('click',render)

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  dateEl.textContent = today
  easyBtn.textContent = levels[0].name
  medBtn.textContent = levels[1].name
  hardBtn.textContent = levels[2].name
  playTimeSeconds = 0
  playTimeDisplay = '0:00'
  results = []
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

function updateAnswerOptions(imageIndex) {
  const currentImageCard = images[imageIndex]
  const correctAnswer = currentImageCard.correct
  const incorrectAnswer = currentImageCard.incorrects[0]
  const answers = [correctAnswer, incorrectAnswer]
  answers.sort(() => Math.random() - 0.5)
  answerAEl.textContent = answers[0]
  answerBEl.textContent = answers[1]
}

function addTouchToCurrentImageCard() {
  const currentImageIndex = imageCards.findIndex( 
    (el) => el.classList.contains('current')
    )
  console.log(`imageCards[${currentImageIndex}]:`)
  console.log(currentImageIndex)
  currentImageEl = imageCards[currentImageIndex]
  console.log(`currentImageEl:`);
  console.log(currentImageEl);
  imageTouchEl = Hammer(currentImageEl)
  console.log(`imageTouchEl:`)
  console.log(imageTouchEl)
  imageTouchEl.on('swipeleft swiperight', answerHandler)
}

function showGame() {
  landingParentEl.classList.add('display-none')  
  gameParentEl.classList.remove('display-none')  
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

function updateStats() {
  answeredCount = results.length
  completeCountEl.textContent = answeredCount
  completeEl.style.flexGrow = answeredCount
  remainingCount = gameLength - answeredCount
  incompleteEl.style.flexGrow = remainingCount
  progress = answeredCount / gameLength
  score = results.reduce((prev,curr) => {
    return prev + curr
  },0)
  accuracy = score / answeredCount
}

function answerHandler(event) {
  if (event.type === 'swipeleft') {
    currentImageEl.classList.add('answered-a')
  } else if (event.type === 'swiperight') {
    currentImageEl.classList.add('answered-b')
  } else {
    console.log(`This else logic shouldn't ever be possible, fix it.`);
  }
  updateImageClasses()
}

function updateImageClasses() {
  const currentImageIndex = imageCards.findIndex( 
    (el) => el.classList.contains('current')
    )
  const currentImage = imageCards[currentImageIndex]
  const nextImage = imageCards[currentImageIndex + 1]
  const nextNextImage = imageCards[currentImageIndex + 2]
  nextImage.classList.add('current')
  nextImage.classList.remove('next')
  nextNextImage.classList.add('next')
  currentImage.classList.remove('current')
  addTouchToCurrentImageCard()
  updateAnswerOptions(currentImageIndex + 1)
}