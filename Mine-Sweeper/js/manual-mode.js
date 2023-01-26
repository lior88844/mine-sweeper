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
}
function placeMines(elCell, cellI, cellJ) {
    if (!gManualMode.isCreate) return
    if (gBoard[cellI][cellJ].isMine) return
    gManualMode.bombsPlacedCount++
    if (gManualMode.bombsPlacedCount > gLevel.mines) return
    gBoard[cellI][cellJ].isMine = true
    elCell.innerText = '💣'
    if (gManualMode.bombsPlacedCount === gLevel.mines) {
        gManualMode.isCreate = false
        gManualMode.bombsPlacedCount = 0
        renderManualBoard()
    }
}
function renderManualBoard() {
    renderBoard(gBoard, ".board-container")
    changeEmoji('startGame')
    startTimer()
}