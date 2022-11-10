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

const getRandomInt = function (min, max) {

    // The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min); 
}


const initBoard = function (board) {

    for (let index = 0; index < 42; index++) {
        board.appendChild(elt("div", { class: "field" }))
    }
}

const fillRandom = function (fieldList) {

    for (let index = 0; index < 42; index++) {

        // -1 = none ; 0 = red ; 1 = blue
        let random = getRandomInt(-1, 2)

        if (random >= 0) {
            fieldList[index].appendChild(elt("div", { class: random == 0 ? "red piece" : "blue piece" }))
        }
    }
}

const showBoard = function () {

    let board = document.getElementsByClassName("board")[0]

    initBoard(board)

    let fieldList = document.getElementsByClassName("field")

    fillRandom(fieldList)
}
