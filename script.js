const gridContainer = document.querySelector("#container");
const gridReset = document.querySelector("#grid-edit");
const gridSizeHint = document.querySelector("#grid-size-hint");

// Create and color initial 16x16 grid
createGrid(16);
colorCell();

// Create a new grid after entering a value
function createGrid(gridSize) {
    // Change size of each column and row (each cell) depeneding on size of grid
    gridContainer.style["grid-template-columns"] = `repeat(${gridSize}, ${720/gridSize}px)`;
    gridContainer.style["grid-template-rows"] = `repeat(${gridSize}, ${720/gridSize}px)`;
    // Add cells amounting to gridSize**2 (horizontally and vertically)
    for (let i = 0; i < gridSize * gridSize; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cells");
        gridContainer.appendChild(cell);
    }
}

// Remove the old cells before new ones are created using createGrid()
function removeOldCells() {
    let cellsToRemove = document.querySelectorAll(".cells");
    cellsToRemove.forEach((cell) => {
        cell.remove();
    })
}

// Color the cell a random color
function colorCell() {
    let cells = document.querySelectorAll(".cells");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", function(e) {
            let hue = Math.random() * 360;
            // If completely white then apply a color, otherwise make darker
            if (e.target.style["background-color"] === ""){
                e.target.style["background-color"] = `hsl(${hue}, 100%, 50%)`;
            } else {
                e.target.style["background-color"] = RGBtoHSL(e.target.style["background-color"]);
            }
        })
    })
}

// Convert from RGB to HSL so lightness can change
function RGBtoHSL(RGBColor) {
    RGBArray = RGBColor.substring(4, RGBColor.length-1).replace(/ /g, '').split(','); // Get the R, G and B values
    let red = parseInt(RGBArray[0]) / 255;
    let green = parseInt(RGBArray[1]) / 255;
    let blue = parseInt(RGBArray[2]) / 255;
    let cMax = Math.max(red, green, blue);
    let cMin = Math.min(red, green, blue);
    let delta = cMax - cMin;
    let hue;
    // Calculate Hue
    if (delta === 0) {
        hue = 0;
    } else if (cMax === red) {
        hue = 60 * (((green - blue) / delta) % 6);
    } else if (cMax === green) {
        hue = 60 * (((blue - red) / delta) + 2);
    } else if (cMax === blue) {
        hue = 60 * (((red - green) / delta) + 4);
    }
    // Calculate Lightness
    let lightness = (cMax + cMin) / 2;
    let saturation;
    // Calculate Saturation
    if (delta === 0) {
        saturation = 0;
    } else {
        saturation = delta / (1 - Math.abs(2 * lightness - 1));
    }
    return `hsl(${parseInt(hue)}, ${saturation * 100}%, ${lightness * 100 - 5}%)`;
}

// Run when the button is clicked
gridReset.addEventListener("click", function(e) {
    // Keep asking for new grid size as long as input doesn't work
    let newGridSize;
    do {
        newGridSize = parseInt(prompt("Enter new grid size - Min 8, Max 128"));
    } while (!(newGridSize => 8) || !(newGridSize <= 128));
    //Remove old cells, update text, create new grid, add option to color cells
    removeOldCells();
    gridSizeHint.textContent = `Current Grid: ${newGridSize}x${newGridSize}, Total ${newGridSize * newGridSize} cells`;
    createGrid(newGridSize);
    colorCell();
})