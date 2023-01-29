'use strict'
var gHintTimeout
function createHints(amount) {
    for (var i = 0; i < amount; i++) {
        gHints.hintsCount++
    }
    renderHints()
}
function renderHints() {
    var elHints = document.querySelector('.hints-container')
    var hintsInnerHTML = ''
    for (var i = 0; i < gHints.hintsCount; i++) {
        hintsInnerHTML += `<div class ="hints hint${i + 1}" onclick="hintClicked(this,${i + 1})">${HINT}</div>`
    }
    elHints.innerHTML = hintsInnerHTML
}
function hintClicked(elHint, numOfHint) {
    if (!gGame.isOn) return
    if (!gGame.clickCount) {
        alert('try at least once and you will get a hint 😙');
        return
    }
    if (gHints.isHint) return
    gHints.isHint = true;
    elHint.style.color = 'transparent'
    elHint.style.textShadow = '0 0 0 purple'
    gHints.clickedHint = numOfHint
}
function revealCells(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShown) continue
            var innerText
            if (gBoard[i][j].isMine) {
                innerText = MINE;
            } else if (gBoard[i][j].minesAroundCount) {
                innerText = gBoard[i][j].minesAroundCount
            } else {
                innerText = EMPTY
            }
            renderCell(i, j, innerText)
        }
    }
    setTimeout(hideCells, 1000, cellI, cellJ)
    setTimeout(removeHint, 1000)
}
function hideCells(cellI, cellJ) {
    gHints.isHint = false
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShown) continue
            var innerText = EMPTY
            renderCell(i, j, innerText)
        }
    }
}
function removeHint() {
    var elHint = document.querySelector(`.hint${gHints.clickedHint}`)
    elHint.style.visibility = "hidden"
}
function megaHintMode() {
    // alert('hi')
    gHints.isMegaHint = true;
    var elTable = document.querySelector('.board-container')
    elTable.classList.toggle = 'mega-hint-mode'

}
function selectArea(cellI, cellJ) {
    if (!gHints.isMegaHint) return
    if (gHints.firstMegaLocation && gHints.secondMegaLocation) {
        revealcellsArea()
        gHints.isMegaHint = false

    }

}
function revealcellsArea() {

}