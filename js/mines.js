'use strict'

function createMines() {
    for (var i = 0; i < gLevel.mines; i++) createMine()
}
function createMine() {
    var minePoss = getEmptyPos()
    gBoard[minePoss.i][minePoss.j].isMine = true;
}
function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].minesAroundCount = minesAroundCount(i, j)
        }
    }
    return
}
function minesAroundCount(cellI, cellJ) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (gBoard[i][j].isMine) negsCount++
        }
    }
    return negsCount
}
function revealMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) renderCell(i, j, MINE)
        }
    }
}
function getEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isMine && i === gFirstLocation.i && j === gFirstLocation.j) {
                continue
            } else {
                emptyPoss.push({ i: i, j: j })
            }
        }
    }
    var randIdx = getRandomIntInclusive(0, emptyPoss.length - 1)
    return emptyPoss[randIdx]
}
