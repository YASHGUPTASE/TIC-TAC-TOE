let cubes = document.querySelectorAll(".cube");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgbox = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts
let count = 0; // To track draws

const winpatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enablebtn();
    msgbox.classList.add("hide");
};

cubes.forEach((cube) => {
    cube.addEventListener("click", () => {
        if (turnO) {
            cube.innerText = "O";
            cube.classList.add("neon-o");
            turnO = false;
        } else {
            cube.innerText = "X";
            cube.classList.add("neon-x");
            turnO = true;
        }
        cube.disabled = true;
        count++;

        let isWinner = checkwinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "IT'S A DRAW!";
    msgbox.classList.remove("hide");
    disablebtn();
};

const disablebtn = () => {
    for (let cube of cubes) {
        cube.disabled = true;
    }
};

const enablebtn = () => {
    for (let cube of cubes) {
        cube.disabled = false;
        cube.innerText = "";
        cube.classList.remove("neon-o");
        cube.classList.remove("neon-x");
    }
};

const showwinner = (winner) => {
    msg.innerText = `CONGRATULATIONS!\nWINNER IS ${winner}`;
    msgbox.classList.remove("hide");
    disablebtn();
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = cubes[pattern[0]].innerText;
        let pos2 = cubes[pattern[1]].innerText;
        let pos3 = cubes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showwinner(pos1);
                return true;
            }
        }
    }
    return false;
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);