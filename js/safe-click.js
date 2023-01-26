"use strict"

function createSafeClick(amount) {
    gGame.safeClickCount = amount;
    renderSafeClick()
}
function renderSafeClick() {
    var elSafeClick = document.querySelector('.safe-click')
    elSafeClick.innerText = `${gGame.safeClickCount} Safe Clicks`
}
function markSafeCell() {
    if (!gGame.isOn) return
    if (!gGame.safeClickCount) return
    var safeCell = getSafeCellPos()
    renderSafeCell()
    gGame.safeClickCount--
    renderSafeClick()
}
function renderSafeCell() {
    var safeCellPos = getSafeCellPos()
    var elSafeCell = document.querySelector(`.cell-${safeCellPos.i}-${safeCellPos.j}`)
    elSafeCell.innerText = SAFE
    setTimeout(hideSafeCell, 3000, elSafeCell)
}
function hideSafeCell(elSafeCell) {
    elSafeCell.innerText = EMPTY
}
function getSafeCellPos() {
    var safeCellsPos = getSafeCellsPos()
    var randomIdx = getRandomIntInclusive(0, safeCellsPos.length - 1)
    var safeCellPos = safeCellsPos[randomIdx]
    return safeCellPos
}
function getSafeCellsPos() {
    var safeCellsPos = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isShown || gBoard[i][j].isMine) continue
            safeCellsPos.push({ i: i, j: j })
        }
    }
    return safeCellsPos
}