"use strict"
var gBestScore = getBestScore()

function getBestScore() {
    var bestScores = {}
    bestScores.beginner = Infinity
    bestScores.medium = Infinity
    bestScores.expert = Infinity
    return bestScores
}
function storeScore() {
    if (gLevel.size === 4 && gGame.secsPassed < gBestScore.beginner) {
        localStorage.setItem("bestBeginnerScore", gGame.secsPassed)
        gBestScore.beginner = localStorage.getItem("bestBeginnerScore")
    } else if (gLevel.size === 8 && gGame.secsPassed < gBestScore.medium) {
        gBestScore.medium = localStorage.getItem("bestBeginnerScore")
        localStorage.setItem("bestMediumScore", gGame.secsPassed)
    } else if (gLevel.size === 12 && gGame.secsPassed < gBestScore.expert) {
        localStorage.setItem("bestExpertScore", gGame.secsPassed)
        gBestScore.expert = localStorage.getItem("bestBeginnerScore")
    }
}
function renderScoreBoard() {
    var elScoreBoard = document.querySelector('.score-board')
    var level = ''
    var levelBestScore
    switch (gLevel.size) {
        case 4:
            level = 'Beginner'
            levelBestScore = gBestScore.beginner
            break
        case 8:
            level = 'Medium'
            levelBestScore = gBestScore.medium
            break
        case 12:
            level = 'Expert'
            levelBestScore = gBestScore.expert
            break
        default:
            level = 'Beginner'
    }
    if (levelBestScore === Infinity) {
        var innerBoardHTML = `<h2>${level} Best Score</h2>
        <p>no best score  <br>set yet</p>`

    } else {
        var innerBoardHTML = `<h2>${level} Best Score</h2>
    <p>${levelBestScore} Seconds</p>`
    }
    elScoreBoard.innerHTML = innerBoardHTML
    elScoreBoard.style.display = 'none'
}
function displayScoreBoard() {
    var elScoreBoard = document.querySelector('.score-board')
    if (elScoreBoard.style.display === 'block') {
        (elScoreBoard.style.display = 'none')
    } else if (elScoreBoard.style.display === 'none') {
        (elScoreBoard.style.display = 'block')
    }
}