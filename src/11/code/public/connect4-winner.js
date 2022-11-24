const BOARD_ROW_MAX = 7
const BOARD_COL_MAX = 6

const connect4Winner = function (player, board) {

    // horizontal
    for (let j = 0; j < BOARD_ROW_MAX - 3 ; j++ ) {
        for (let i = 0; i < BOARD_COL_MAX; i++) {
            if (board[i][j].includes(player) && board[i][j + 1].includes(player) && board[i][j + 2].includes(player) && board[i][j + 3].includes(player)) {
                return true;
            }
        }
    }

    // vertical
    for (let i = 0; i < BOARD_COL_MAX - 3 ; i++ ) {
        for (let j = 0; j < BOARD_ROW_MAX; j++) {
            if (board[i][j].includes(player) && board[i + 1][j].includes(player) && board[i + 2][j].includes(player) && board[i + 3][j].includes(player)) {
                return true;
            }   
        }
    }

    // ascending diagonal
    for (let i = 3; i < BOARD_COL_MAX; i++) {
        for (let j = 0; j < BOARD_ROW_MAX - 3; j++) {
            if (board[i][j].includes(player) && board[i - 1][j + 1].includes(player) && board[i - 2][j + 2].includes(player) && board[i - 3][j + 3].includes(player)) {
                return true;
            }
        }
    }

    // descending diagonal
    for (let i = 3; i < BOARD_COL_MAX; i++) {
        for (let j = 3; j < BOARD_ROW_MAX; j++) {
            if (board[i][j].includes(player) && board[i - 1][j - 1].includes(player) && board[i - 2][j - 2].includes(player) && board[i - 3][j - 3].includes(player)) {
                return true;
            }
        }
    }

    return false
}
