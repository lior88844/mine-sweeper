'use strict'

const MINE = '💣'
const EMPTY = ' '
const FLAG = '🚩'
const LIFE = '❤️'
const HINT = '💡'
const SAFE = '👍'

var gBoard
var gLevel = getLevel()
var gGame
var gFirstLocation
var gHints
var gManualMode




function onInit() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        clickCount: 0,
        livesCount: 0,
        lives: 0,
        safeClickCount: 0,
    }
    gHints = {
        hintsCount: 0,
        isHint: false,
        clickedHint: 0
    }
    gManualMode = {
        isManual: false,
        isCreate: false,
        bombsPlacedCount: 0
    }
    gBoard = buildBoard()
    renderBoard(gBoard, ".board-container")
    createLives(3)
    createHints(3)
    createSafeClick(3)
    changeEmoji('startGame')
    startTimer()
}
function changeLevel(size, mines) {
    gLevel = getLevel(size, mines)
    onInit()
}
function getLevel(size, mines) {
    var level = {}
    if (!size || !mines) {
        level.size = 4
        level.mines = 2
    } else {
        level.size = size
        level.mines = mines
    }
    return level
}
function buildBoard() {
    //creating a board with cell objects inside
    const size = gLevel.size
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = buildCell(i, j)
        }
    }
    return board
}
function buildCell(i, j) {

    //creating a cell object
    const cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
    }
    return cell
}
function onCellClicked(cellI, cellJ) {
    if (!gGame.isOn) return
    if (gBoard[cellI][cellJ].isShown) return
    if (gManualMode.isCreate) return
    if (gGame.clickCount === 0) {
        onFirstClick(cellI, cellJ)
        gGame.clickCount++
        return
    }
    if (gHints.isHint) {
        revealCells(cellI, cellJ)
        return
    }
    if (gBoard[cellI][cellJ].isMine) removeLife()
    if (gBoard[cellI][cellJ].isShown) return
    gGame.clickCount++
    cellsShown(cellI, cellJ);
    checkGameOver()
}
function onFirstClick(cellI, cellJ) {
    gFirstLocation = { i: cellI, j: cellJ }
    if (gBoard[cellI][cellJ].isShown) return
    if (!gManualMode.isManual) createMines()
    setMinesNegsCount()
    renderBoard(gBoard, ".board-container")
    cellsShown(cellI, cellJ)
}
function cellsShown(cellI, cellJ) {
    var cellData = gBoard[cellI][cellJ]
    if (cellData.isMine) {
        cellData.isShown = true;
        gGame.shownCount++
        renderCell(cellI, cellJ, MINE)
    } else if (cellData.minesAroundCount > 0) {
        cellData.isShown = true
        gGame.shownCount++
        renderCell(cellI, cellJ, cellData.minesAroundCount)
    } else {
        //opening all the cells until reaching bomb
        expandShown(cellI, cellJ)
    }
}
function expandShown(cellI, cellJ) {
    var cellData = gBoard[cellI][cellJ]
    var innerText
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShown) continue
            gBoard[i][j].isShown = true
            gGame.shownCount++
            innerText = (gBoard[i][j].minesAroundCount) ? gBoard[i][j].minesAroundCount : EMPTY;
            renderCell(i, j, innerText)
            if (gBoard[i][j].minesAroundCount === 0) expandShown(i, j)
        }
    }
}
function getCellInnerText(cellI, cellJ) {
    var cellData = gBoard[cellI][cellJ]
    var innerText
    if (cellData.isMine) {
        innerText = MINE
    } else if (cellData.minesAroundCount > 0) {
        innerText = cellData.minesAroundCount
    } else {
        innerText = EMPTY
    }
    return innerText
}
function onCellMarked(elCell, cellI, cellJ) {
    if (!gGame.isOn) return
    var currCellData = gBoard[cellI][cellJ]
    if (currCellData.isShown) return
    if (gGame.clickCount === 0) return
    //change isMarked data
    if (currCellData.isMarked) {
        currCellData.isMarked = false
        if (currCellData.isMine) gGame.markedCount--
    } else {
        currCellData.isMarked = true
    }
    if (gBoard[cellI][cellJ].isMarked && gBoard[cellI][cellJ].isMine) gGame.markedCount++
    if (elCell.innerText === FLAG) {
        elCell.innerText = EMPTY
    } else {
        elCell.innerText = FLAG
    }
    checkGameOver()
}
function checkGameOver() {
    if (gGame.shownCount + gGame.markedCount === gLevel.size ** 2 && gGame.lives > 0) winGame()
}
function winGame() {
    gGame.isOn = false
    // playWinSound()
    stopTimer()
    changeEmoji('won')
}
function playWinSound() {
    const sound = new Audio('sound/win.mp3')
    sound.play()
}
function loseGame() {
    gGame.isOn = false
    // playLoseSound()
    revealMines()
    stopTimer()
    var elEmoji = document.querySelector('.emoji')
    changeEmoji('lost')
}
function playLoseSound() {
    const sound = new Audio('sound/lose.mp3')
    sound.play()
}
function changeEmoji(gameState) {
    var elEmoji = document.querySelector('.emoji')
    var innerEmojiText
    switch (gameState) {
        case "won":
            innerEmojiText = "🤩"
            break;
        case "lost":
            innerEmojiText = "🤯"
            break;
        case "startGame":
            innerEmojiText = "😄"
            break;
        case "manual":
            innerEmojiText = "🤓"
            break;
        default:
            innerEmojiText = "😄"
            break;
    }
    elEmoji.innerText = innerEmojiText;
}
function megaHintMode() { }