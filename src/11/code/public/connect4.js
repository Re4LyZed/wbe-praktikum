const BOARD_ROW = 6
const BOARD_COL = 7
const BOARD_TOT = BOARD_ROW * BOARD_COL

const PIECE = 'piece'
const BLANK = ''
const BLUE = 'blue'
const RED = 'red'

const SERVICE = "http://localhost:3000/api/data/c4state?api-key=c4game"

const JSDON_FIELD_INIT = ["div", { class: "field" }]
const JSDON_FIELD_VAR = ["div"]

const LOCAL_STORAGE_STATE = "state"

// local game state
let state = {
    board: undefined,
    nextPlayerTurn: undefined
}

function initBoard(board) {

    board.replaceChildren([])

    for (let index = 0; index < BOARD_TOT; index++) {
        renderSJDON(JSDON_FIELD_INIT, board)
    }
}

function setState(fieldListIndex) {

    // read col
    let col = fieldListIndex

    while (col >= BOARD_COL) {
        col -= BOARD_COL
    }

    // determine row
    let row = -1
    for (let row_index = BOARD_ROW - 1; row_index >= 0; row_index--) {
        if (state.board[row_index][col] == BLANK) {
            row = row_index
            break
        }
    }

    if (row == -1) {
        return false
    }

    // set player value
    let pieceValue

    switch (state.nextPlayerTurn) {
        case RED:
            pieceValue = PIECE.concat(' ', RED)
            state.nextPlayerTurn = BLUE
            break;
        case BLUE:
            pieceValue = PIECE.concat(' ', BLUE)
            state.nextPlayerTurn = RED
            break;
    }

    state.board[row][col] = pieceValue

    return true
}

function setBoard(fieldList) {

    for (let row = 0; row < BOARD_ROW; row++) {
        for (let col = 0; col < BOARD_COL; col++) {

            let field = fieldList[row * BOARD_COL + col]

            if (field.children.length > 0) {
                // update piece
                field.children[0].setAttribute("class", state.board[row][col])
            } else {
                // add piece
                renderSJDON([...JSDON_FIELD_VAR, { class: state.board[row][col] }], field)
            }
        }
    }
}

function playGame(fieldList, fieldListIndex) {

    let playerTurn = state.nextPlayerTurn

    if (setState(fieldListIndex)) {

        updateView(fieldList)

        if (connect4Winner(playerTurn[0], state.board)) {
            // quick delay to ensure the view is updated
            setTimeout(() => {
                alert("GAME OVER: " + playerTurn + " won!")
                initGame()
            }, 1);
        }
    }
}

function updateView(fieldList) {

    setBoard(fieldList)

    document.getElementById("nextPlayerTurn").textContent = state.nextPlayerTurn
}

//  Initialize game
//
function initGame() {
    let board = showBoard()
    attachEventHandler(board)
}


//  Show board
// 
function showBoard() {

    let board = document.querySelector(".board")

    // first remove all fields
    while (board.firstChild) { board.removeChild(board.firstChild) }

    // init
    state = {
        board: Array(BOARD_ROW).fill(BLANK).map(el => Array(BOARD_COL).fill(BLANK)),
        nextPlayerTurn: BLUE
    }

    // nextPlayerTurn
    document.getElementById("nextPlayerTurn").textContent = state.nextPlayerTurn

    initBoard(board)

    return board
}


//  Attach event handler to board
//
function attachEventHandler(board) {

    // event: click - fields
    Array.from(board.children).forEach(element => {
        element.addEventListener("click", (event) => {
            playGame(board.children, Array.from(board.children).indexOf(event.target))
        })
    })
}


//  Get current state from localStorage and re-draw board
//
function loadState() {

    let localState = localStorage.getItem(LOCAL_STORAGE_STATE)

    if (localState != null) {
        state = JSON.parse(localState)
        updateView(document.querySelector(".board").children)
        alert("Game loaded!")
    }
}

//  Put current state to localStorage
//
function saveState() {

    localStorage.setItem(LOCAL_STORAGE_STATE, JSON.stringify(state))
    alert("Game saved!")
}


//  Get current state from server and re-draw board
//
function loadStateServer() {

    fetch(SERVICE)
        .then(response => response.json())
        .then(data => state = data)
        .then(() => {
            updateView(document.querySelector(".board").children)
            alert("Game loaded!")
        })
}

//  Put current state to server
//
function saveStateServer() {

    fetch(SERVICE, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(state)
    }).then(alert("Game saved!"))
}


//  Start new game
//
function newGame() {
    initGame()
}

//  Event: DOMContentLoaded
//
document.addEventListener("DOMContentLoaded", function (event) {

    // enable server load/save when service could be reached
    fetch(SERVICE)
        .then(() => {
            let buttonLoadStateServer = document.getElementById("loadStateServer")
            buttonLoadStateServer.removeAttribute("hidden")
            let buttonSaveStateServer = document.getElementById("saveStateServer")
            buttonSaveStateServer.removeAttribute("hidden")
        })
})