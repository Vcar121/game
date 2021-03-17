/*
 *  0为安全区
 *  1为雷区
 *  2为标记
 */
let pattern = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
]

//建造扫雷区域
function build() {

    let main = document.getElementById("main");
    main.innerHTML = '';
    let btn = document.getElementsByTagName("button")[0];

    for (let col = 0; col < pattern.length; col++) {
        for (let row = 0; row < pattern.length; row++) {

            let cell = document.createElement("div");

            cell.classList.add('cell');
            cell.addEventListener('dblclick', () => check(col, row, cell));
            cell.addEventListener('click', () => {
                cell.innerText = '❓';
            });
            btn.addEventListener('click', () => clickbtn(btn));
            main.appendChild(cell);
        }
    }
}

function check(x, y, cell) {
    if (pattern[x][y] === 1) {
        cell.innerText = '💣';
        let tip = document.getElementById('tip');
        tip.innerText = '挑战失败！请重新开始！';
    } else if (pattern[x][y] === 0) {
        cell.innerText = '😀';
    }
}

function clickbtn(btn) {
    location.reload();
}

window.setTimeout(build, 1);