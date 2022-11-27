import { connect4Winner } from "./connect4-winner.js"
import { setInList, setInObj } from "./immute.js"
import { render } from "./lib/suiweb.js"

const BOARD_ROW = 6
const BOARD_COL = 7
const BOARD_TOT = BOARD_ROW * BOARD_COL

const PIECE = 'piece'
const BLANK = ''
const BLUE = 'blue'
const RED = 'red'

const SERVICE = "http://localhost:3000/api/data/c4state?api-key=c4game"

const LOCAL_STORAGE_STATE = "state"

// SuiWeb - Begin
const App = () => [
    "wrapper",
    [Board, { board: state.board }],
    [Control]
]

const Board = ({ board }) => {
    let flatBoard = [].concat(...board)
    let fields = flatBoard.map((type) => [Field, { type }])
    return (
        ["div", { className: "board" }, ...fields]
    )
}

const Field = ({ type }) => {
    return ["div", { className: "field" }, ["div", { className: type }]]
}

const Control = () => [
    "div", { className: "controls" },
    ["p", "Next player:",
        ["strong", { id: "nextPlayerTurn" }]
    ],
    ["button", { onclick: loadState, id: "loadState" }, "Load"],
    ["button", { onclick: saveState, id: "saveState" }, "Save"],
    ["button", { onclick: loadStateServer, id: "loadStateServer", hidden: true }, "Load from Server"],
    ["button", { onclick: saveStateServer, id: "saveStateServer", hidden: true }, "Save to Server"],
    ["button", { onclick: newGame, id: "newGame" }, "New Game"],
    ["button", { onclick: undoAction, id: "undoAction" }, "Undo"]
]
// SuiWeb - End

const STATE_BOARD = 'board'
const STATE_NPT = 'nextPlayerTurn'

// local game state
let state = {
    board: undefined,
    nextPlayerTurn: undefined
}

// local game state - sequence
let stateSeq = undefined

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
    let nextPlayerTurn

    switch (state.nextPlayerTurn) {
        case RED:
            pieceValue = PIECE.concat(' ', RED)
            nextPlayerTurn = BLUE
            break;
        case BLUE:
            pieceValue = PIECE.concat(' ', BLUE)
            nextPlayerTurn = RED
            break;
    }

    // state push
    stateSeq.push(state)

    // state set board
    state = setInObj(state, STATE_BOARD,
        setInList(state.board, row,
            setInList(state.board[row], col, pieceValue)
        )
    )

    // state set nextPlayerTurn
    state = setInObj(state, STATE_NPT, nextPlayerTurn)

    return true
}

function setBoard(fieldList) {

    for (let row = 0; row < BOARD_ROW; row++) {
        for (let col = 0; col < BOARD_COL; col++) {

            let field = fieldList[row * BOARD_COL + col]

            if (field.children.length > 0) {
                // update piece
                field.children[0].setAttribute("class", state.board[row][col])
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

    // init state & sequence
    state = {
        board: Array(BOARD_ROW).fill(BLANK).map(el => Array(BOARD_COL).fill(BLANK)),
        nextPlayerTurn: BLUE
    }

    stateSeq = []

    // showBoard
    let app = showBoard()

    // attach event handler
    attachEventHandler(app)

    // nextPlayerTurn
    document.getElementById("nextPlayerTurn").textContent = state.nextPlayerTurn

    // enable server load/save when service could be reached
    fetch(SERVICE)
        .then(() => {
            let buttonLoadStateServer = document.getElementById("loadStateServer")
            buttonLoadStateServer.removeAttribute("hidden")
            let buttonSaveStateServer = document.getElementById("saveStateServer")
            buttonSaveStateServer.removeAttribute("hidden")
        })
}


//  Show board
// 
function showBoard() {
    const app = document.querySelector(".app")
    render([App], app)
    return app
}


//  Attach event handler to board
//
function attachEventHandler(app) {

    let board = app.children[0].children[0]

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
        stateSeq = []
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
        .then(data => {
            state = data
            stateSeq = []
        })
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


//  Undo action
//
function undoAction() {

    if (stateSeq.length > 0) {
        state = stateSeq.pop()    
        updateView(document.querySelector(".board").children)
    } else {
        alert("Undo not possible!")
    }
}

export { initGame }
