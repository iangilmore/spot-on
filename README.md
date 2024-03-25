<h2 align="center">
  <img src="img/logo-main.png" width="200" alt="Spot On">
  <br>
  <em>Think Fast</em>
</h2>

<p align="center">
Spot On is a browser-based game where players test their knowledge and quick decision making by swiping photos toward the matching word as quickly as possible. The game provides a fun interaction model and an engaging challenge across three different difficulty levels.
</p>
  
![Netlify Status](https://api.netlify.com/api/v1/badges/758a970c-1e09-40ab-ac0e-1ec525300c94/deploy-status)  
![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=spot-on-game-ian-gilmore&style=for-the-badge)

## Screenshots

<p align="center">
<img src="https://github.com/iangilmore/spot-on/assets/6451468/efd269e9-c3c6-4690-bad8-70a9ca5e0af8" width="1024">
</p>

## Getting Started

You can play Spot On at [Netlify](https://spot-on-game-ian-gilmore.netlify.app/) and [Vercel](https://spot-on-game-ian-gilmore.vercel.app/) directly in your mobile or desktop web browser. You can also  clone this repo and run it locally ([VS Code](https://code.visualstudio.com/) + [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension works well). 

To play, simply select your preferred level then start swiping each image toward the word you think matches it. Good luck!

## Concept Wireframes

<p align="center">
<img src="https://github.com/iangilmore/spot-on/assets/6451468/0db344b1-0d83-4354-8893-3051be4a58b7" width="1024">
</p>


## MVP User Stories

- As a player, I want to land on the game's page and quickly be able to start the game in one tap/click.
- As a player, I want to be able to easily swipe/toss the photo left or right depending on which answer I think is correct.
- As a player on a non-touch-based device, I want to have fun playing the game even when touch isn't possible, with the ease/difficuly being the same touch-based players.
- As a player, I want to get positive feedback when I get an answer correct and negative yet playful feedback when incorrect.
- As a player, I want to keep track of my progress/score while I play.
- As a player, I want to see my results at the end of the game.
- As a player, I want to share my results to friends, etc.


## Timeline

| Day | MVP Items                                                                  | Goal Met | Notes                     |
|-----|----------------------------------------------------------------------------|----------|---------------------------|
| 1   | Single tap to start game. Initial logic & functionality.                   | Y        |                           |
| 2   | Keep track of progress during game play. Overall functionality.            | Y        |                           |
| 3   | Easily swipe/toss photos left & right. More overall functinality & logic.  | N        | Ran into scope limitations writing this functionality myself, the next day I pulled in a lightweight library instead.|
| 4   | Implement touch on phone, mock touch on desktop. Start restuls screen.     | Y        |                           |
| 5   | Share results. Add logo. Finalize theme.                                   | Y        |                           |
| 6   | Add answer feedback. Add final images. Fine tune animations. MVP Complete! | Y        |                           |
|     |                                                                            |          |                           |


## Technologies Used

- HTML
- CSS
- JavaScript

## Attributions

- [Hammer.js](https://hammerjs.github.io/) - Lightweight multi-touch library
- [Normalize.css](https://necolas.github.io/normalize.css/) - CSS reset stylesheet
- [Noto Typeface](https://fonts.google.com/noto) - World script by Monotype for Google
- [Unsplash](https://unsplash.com/) - Beautiful Photography
- [Google Gemini](https://gemini.google.com/) - Logo creation
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Website Favicon
- [Whimsical](https://whimsical.com/) - Wireframing


## Next Steps

- Add a simple "how to play" guide and/or improve first run UX to hint at how to answer.
- Add a "review details" screen where a player can review what they got right/wrong, perhaps provide links to learn more about each image/topic.
- Consider intergrating diretly with the Unsplash API for dynamic image sourcing.

Enjoy playing!
