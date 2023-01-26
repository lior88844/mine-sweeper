'use strict'
function createLives(amount) {
    for (var i = 0; i < amount; i++) {
        gGame.lives++
    }
    renderLives()
}
function renderLives() {
    var elLives = document.querySelector(".lives")
    var innerLivesText = ''
    for (var i = 0; i < gGame.lives; i++) {
        innerLivesText += LIFE
    }
    elLives.innerText = innerLivesText;
}
function removeLife() {
    gGame.lives--
    if (gGame.lives === 0) loseGame()
    renderLives()
}