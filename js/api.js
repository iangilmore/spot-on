const apiUrl = 'https://api.spot-on.webdevstuff.ninja'

let user
let userId
let firstName
let currentPuzzles
let resultHistory

async function getUser() {
  try {
    const response = await fetch(
      `${apiUrl}/user/`, {
        method: 'GET',
        credentials: 'include'
      }
    )
    user = await response.json()
    userId = user._id
    firstName = user.firstName || null
    resultHistory = user.results || null
  } catch (error) {
    console.error(`Couldn't get user:` + error)
  }
}

async function getCurrentPuzzles() {
  try {
    const response = await fetch(
      `${apiUrl}/puzzles/?date=${YYYYMMDD}`, {
        method: 'GET',
        credentials: 'include'
      }
    )
    currentPuzzles = await response.json()
  } catch (error) {
    console.error(error)
  }
}

async function submitResult(result) {
  try {
    const response = await fetch(
      `${apiUrl}/results/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result),
        credentials: 'include'
      }
    )
    const newResult = await response.json()
    return newResult
  } catch (error) {
    console.error(error)
  }
}