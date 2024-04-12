const apiUrl = 'https://spot-on-api-61c1dd69af4d.herokuapp.com/'

let user
let userId
let firstName
let todayPuzzles
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
    console.error(error)
  }
}

getUser()