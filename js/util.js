'use strict'

function renderBoard(board, selector) {
    var strHTML = '<table border="0" oncontextmenu="return false;"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = createCell(i, j, EMPTY)
            strHTML += cell
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}
function createCell(i, j, innerText) {
    var cell = innerText
    var className = `cell cell-${i}-${j}`
    var strHTML = `<td class="${className}" onclick="onCellClicked(${i},${j});placeMines(this,${i},${j})" oncontextmenu="onCellMarked(this,${i},${j})">${cell}</td>`
    return strHTML
}
function renderCell(i, j, innerText) {
    const elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.innerText = innerText;
    elCell.style.fontSize = '20px'
    renderStyleOfCell(elCell, i, j)
}
function renderStyleOfCell(elCell, i, j) {
    if (gManualMode.isManual) {
        elCell.style.backgroundColor = 'transparent'
        return
    }
    if (gBoard[i][j].isShown) {
        elCell.style.backgroundColor = 'rgba(0, 0, 0, 0.55)'
        elCell.style.cursor = "auto"
    } else {
        elCell.style.backgroundColor = '#6b7211'
        if (gHints.isHint) {
            elCell.style.backgroundColor = '#8b9415'
        }
    }

}
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}
