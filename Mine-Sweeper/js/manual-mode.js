'use-strict'

function manualMode() {
    onInit()
    gManualMode.isManual = true
    gManualMode.isCreate = true
    changeEmoji("manual")
    startTimer()
    stopTimer()
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            renderCell(i, j, EMPTY)
        }
    }
    renderMinesToPlace()
}
function placeMines(elCell, cellI, cellJ) {
    if (!gManualMode.isCreate) return
    if (gManualMode.bombsPlacedCount >= gLevel.mines) return
    if (gBoard[cellI][cellJ].isMine) {
        elCell.innerText = ''
        gManualMode.bombsPlacedCount--
        gBoard[cellI][cellJ].isMine = false
        renderMinesToPlace()
        return
    }
    //place a mine
    elCell.innerText = '💣'
    gManualMode.bombsPlacedCount++
    gBoard[cellI][cellJ].isMine = true
    renderMinesToPlace()
    if (gManualMode.bombsPlacedCount === gLevel.mines) setTimeout(renderManualBoard, 1000)
}
function renderManualBoard() {
    gManualMode.bombsPlacedCount = 0
    renderBoard(gBoard, ".board-container")
    changeEmoji('startGame')
    startTimer()
    gManualMode.isCreate = false
    removeMinesToPlace()
}
function renderMinesToPlace() {
    elMinesToPlace = document.querySelector('.mines-to-place')
    elMinesToPlace.innerText = `💣 ${gLevel.mines - gManualMode.bombsPlacedCount}`
}
function removeMinesToPlace() {
    elMinesToPlace = document.querySelector('.mines-to-place')
    elMinesToPlace.innerText = ``
}