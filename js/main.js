'use strict'

const MINE = '💣'
const EMPTY = ' '
const FLAG = '🚩'
var gBoard
var gLevel
var gGame
var gFirstLocation

function onInit() {
    gLevel = {
        size: 4,
        mines: 2
    }
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        clickCount: 0
    }
    gBoard = buildBoard()
    renderBoard(gBoard, ".board-container")
    changeEmoji('startGame')
}
function changeLevel(size, mines) {
    gLevel.size = size
    gLevel.mines = mines
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        clickCount: 0
    }
    gBoard = buildBoard()
    renderBoard(gBoard, ".board-container")
    changeEmoji("startGame")
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
function onCellClicked(elCell, cellI, cellJ) {
    gGame.clickCount++
    if (!gGame.isOn) return
    if (gGame.clickCount === 1) {
        onFirstClick(elCell, cellI, cellJ)
        return
    }
    if (gBoard[cellI][cellJ].isMine) loseGame()
    gBoard[cellI][cellJ].isShown = true;
    cellsShown(elCell, cellI, cellJ);
}
function onFirstClick(elCell, cellI, cellJ) {
    gFirstLocation = { i: cellI, j: cellJ }
    createMines()
    setMinesNegsCount()
    renderBoard(gBoard, ".board-container")
    cellsShown(elCell, cellI, cellJ)
}
function cellsShown(elCell, cellI, cellJ) {
    var cellData = gBoard[cellI][cellJ]
    if (cellData.isMine) {
        cellData.isShown = true;
        renderCell(cellI, cellJ, MINE)
    } else if (cellData.minesAroundCount > 0) {
        cellData.isShown = true
        renderCell(cellI, cellJ, cellData.minesAroundCount)
    } else {
        //opening all the cells until reaching bomb
        expandShown(elCell, cellI, cellJ)
    }
}
function expandShown(elCell, cellI, cellJ) {
    var cellData = gBoard[cellI][cellJ]
    var innerText
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            innerText = (gBoard[i][j].minesAroundCount) ? gBoard[i][j].minesAroundCount : EMPTY;
            gBoard[i][j].minesAroundCount
            renderCell(i, j, innerText)
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
    if (gBoard[cellI][cellJ].isShown) return
    if (elCell.innerText === FLAG) {
        elCell.innerText = EMPTY
    } else {
        elCell.innerText = FLAG
    }
    gBoard[cellI][cellJ].isMarked = !gBoard[cellI][cellJ].isMarked
    checkGameOver()
}
function checkGameOver(cellI, cellJ) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMarked !== gBoard[i][j].isMine)
                return
        }
    }
    winGame()
}
function winGame() {
    gGame.isOn = false
    console.log('Winner!');
    changeEmoji('won')
}
function loseGame() {
    gGame.isOn = false
    console.log('You Lost...');
    revealMines()
    var elEmoji = document.querySelector('.emoji')
    changeEmoji('lost')
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
        default:
            innerEmojiText = "😄"
            break;
    }
    elEmoji.innerText = innerEmojiText;
}

