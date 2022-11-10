const BOARD_ROW = 6
const BOARD_COL = 7
const BOARD_TOT = BOARD_ROW * BOARD_COL

const PIECE = 'piece'
const BLANK = ''
const BLUE = 'blue'
const RED = 'red'

function elt(type, attrs, ...children) {

    let node = document.createElement(type)

    for (a in attrs) {
        node.setAttribute(a, attrs[a])
    }

    for (let child of children) {
        if (typeof child != "string") node.appendChild(child)
        else node.appendChild(document.createTextNode(child))
    }

    return node
}

function initBoard (board) {

    board.replaceChildren([])

    for (let index = 0; index < BOARD_TOT; index++) {
        board.appendChild(elt("div", { class: "field" }))
    }
}

function setState (state, fieldListIndex) {

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

function setBoard (fieldList, state) {

    for (let row = 0; row < BOARD_ROW; row++) {
        for (let col = 0; col < BOARD_COL; col++) {

            let field = fieldList[row * BOARD_COL + col]

            if (field.children.length > 0) {
                // update piece
                field.children[0].setAttribute("class", state.board[row][col])
            } else {
                // add piece
                field.appendChild(elt("div", { class: state.board[row][col] }))
            }
        }
    }
}

function playGame (fieldList, state, fieldListIndex) {
    
    success = setState(state, fieldListIndex)

    if (success) {

        setBoard(fieldList, state)
        
        document.getElementById("nextPlayerTurn").textContent = state.nextPlayerTurn

    }
}

const showBoard = function () {

    // init
    let state = {
        board: Array(BOARD_ROW).fill(BLANK).map(el => Array(BOARD_COL).fill(BLANK)),
        nextPlayerTurn: BLUE
    }

    // nextPlayerTurn
    document.getElementById("nextPlayerTurn").textContent = state.nextPlayerTurn

    // board
    let board = document.getElementsByClassName("board")[0]

    initBoard(board)

    // fieldList
    let fieldList = document.getElementsByClassName("field")

    // event: click - fieldList
    Array.from(document.getElementsByClassName("field")).forEach(element => {
        element.addEventListener("click", (event) => {
            playGame(fieldList, state, Array.from(fieldList).indexOf(event.target))
        })
    })

    // event: click - newGame
    document.getElementById("newGame").addEventListener("click", () => {
        showBoard()
    })

    /*
    <div class="board">
  
      <div class="field">
        <div class="blue piece"></div>
      </div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field">
        <div class="red piece"></div>
      </div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
  
    </div>
    */
}