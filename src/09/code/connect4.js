const BOARD_ROW = 6
const BOARD_COL = 7
const BOARD_TOT = BOARD_ROW * BOARD_COL

const PIECE_BLANK = ''
const PIECE_BLUE = 'blue piece'
const PIECE_RED = 'red piece'

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

function getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function initBoard (board) {

    for (let index = 0; index < BOARD_TOT; index++) {
        board.appendChild(elt("div", { class: "field" }))
    }
}

function fillRandom (state) {

    let pieceRow = getRandomInt(0, BOARD_ROW - 1)
    let pieceCol = getRandomInt(0, BOARD_COL - 1)

    // -1 = blank ; 0 = red ; 1 = blue
    let randomAction = getRandomInt(-1, 2)

    let pieceValue

    switch (randomAction) {
        case -1:
            pieceValue = PIECE_BLANK
            break;
        case 0:
            pieceValue = PIECE_RED
            break;
        case 1:
            pieceValue = PIECE_BLUE
            break;
    }

    state[pieceRow][pieceCol] = pieceValue
}

function setBoard (fieldList, state) {

    for (let row = 0; row < BOARD_ROW; row++) {
        for (let col = 0; col < BOARD_COL; col++) {

            let field = fieldList[row * BOARD_COL + col]

            if (field.children.length > 0) {
                // update piece
                field.children[0].setAttribute("class", state[row][col])
            } else {
                // add piece
                field.appendChild(elt("div", { class: state[row][col] }))
            }
        }
    }
}

function playGame (fieldList, state) {

    setInterval(() => {
    
        fillRandom(state)

        setBoard(fieldList, state)

    }, 1000);
}

const showBoard = function () {

    let state = Array(BOARD_ROW).fill(PIECE_BLANK).map(el => Array(BOARD_COL).fill(PIECE_BLANK))

    let board = document.getElementsByClassName("board")[0]

    initBoard(board)

    let fieldList = document.getElementsByClassName("field")

    playGame(fieldList, state)

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