'use strict'
var gTimerInterval

function startTimer() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '⏱0'
    clearInterval(gTimerInterval)
    gTimerInterval = setInterval(countUp, 1000)
}
function countUp() {
    gGame.secsPassed++
    renderTimer()
}
function renderTimer() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = `⏱ ${gGame.secsPassed}`
}
function stopTimer() {
    clearInterval(gTimerInterval)
}