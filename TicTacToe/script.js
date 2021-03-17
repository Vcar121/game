// 棋盘
let pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//判断棋手
let chess = 1;

//棋盘胜负
let hasWinner = false;

/** 渲染棋盘 */
function build() {
    // 获取棋盘元素
    let board = document.getElementById('board');

    board.innerHTML = '';

    // 填充棋盘
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');

            // 创建圆圈棋子
            let circle = document.createElement('i');
            circle.classList.add('iconfont', 'icon-circle', 'blue');
            // 创建叉叉棋子
            let cross = document.createElement('i');
            cross.classList.add('iconfont', 'icon-cross', 'purple');
            // 创建空棋子
            let empty = document.createElement('i');

            let chessIcon = pattern[y][x] == 2 ? cross : pattern[y][x] == 1 ? circle : empty;
            cell.appendChild(chessIcon);
            cell.addEventListener('click', () => fallChess(x, y, cell));
            board.appendChild(cell);

            //重新开始
            let btn = document.getElementsByTagName('button')[0];
            btn.addEventListener('click', () => clickbtn(btn));
        }
    }
}

//落棋子
function fallChess(x, y, cell) {
    if (pattern[y][x]) return;
    pattern[y][x] = chess;

    //判断输赢
    if (successOrFailure(pattern, chess)) {
        createTips(chess == 2 ? '叉叉赢了！' : '圈圈赢了！');
        hasWinner = true;
    }

    chess = 3 - chess;
    build();
}

//判断输赢
function successOrFailure(pattern, chess) {
    //竖着的
    for (let y = 0; y < 3; y++) {
        //true为win
        let flag = true;
        for (let x = 0; x < 3; x++) {
            if (pattern[y][x] !== chess) {
                flag = false;
                break;
            }
        }
        if (flag) return true;
    }
    //横着的
    for (let y = 0; y < 3; y++) {
        //true为win
        let flag = true;
        for (let x = 0; x < 3; x++) {
            if (pattern[x][y] !== chess) {
                flag = false;
            }
        }
        if (flag) return true;
    }
    //左向右斜
    {
        let flag = true;
        for (let i = 0; i < 3; i++) {
            if (pattern[i][i] !== chess) {
                flag = false;
            }
        }
        if (flag) return true;
    }
    //右向左斜
    {
        let flag = true;
        for (let i = 0; i < 3; i++) {
            if (pattern[i][2 - i] !== chess) {
                flag = false;
            }
        }
        if (flag) return true;
    }
    return false;
}

//提示信息
function createTips(str) {
    let tip = document.getElementById("tips");
    tip.innerHTML = str;
    if ('叉叉赢了！' == str)
        tip.style.color = "#ea4dc5";
    else
        tip.style.color = "#7ceefc";
}

function clickbtn(btn) {
    location.reload();
}

window.setTimeout(build, 1);