const gridContainer = document.querySelector("#container");
const gridReset = document.querySelector("#grid-edit");
const gridSizeHint = document.querySelector("#grid-size-hint");

createGrid(16);
colorCell();

function createGrid(gridSize) {
    gridContainer.style["grid-template-columns"] = `repeat(${gridSize}, ${720/gridSize}px)`;
    gridContainer.style["grid-template-rows"] = `repeat(${gridSize}, ${720/gridSize}px)`;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cells");
            gridContainer.appendChild(cell);
        }
    }
}

function colorCell() {
    let cells = document.querySelectorAll(".cells");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", function(e) {
            let red = Math.random() * 255;
            let green = Math.random() * 255;
            let blue = Math.random() * 255;
            e.target.style["background-color"] = `rgb(${red}, ${green}, ${blue})`
        })
    })
}

gridReset.addEventListener("click", function(e) {
    let newGridSize;
    do {
        newGridSize = parseInt(prompt("Enter new grid size - Min 8, Max 128"));
    } while (!(newGridSize => 8) || !(newGridSize <= 128));
    let cellsToRemove = document.querySelectorAll(".cells");
    cellsToRemove.forEach((cell) => {
        cell.remove();
    })
    gridSizeHint.textContent = `Current Grid: ${newGridSize}x${newGridSize}, Total ${newGridSize * newGridSize} cells`;
    createGrid(newGridSize);
    colorCell();
})