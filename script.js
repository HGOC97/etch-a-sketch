const gridContainer = document.querySelector("#container");

// Create a 16x16 grid
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        let cell = document.createElement("div");
        cell.style["height"] = "32px";
        cell.style["width"] = "32px";
        cell.style["display"] = "inline-block";
        cell.style["margin"] = "0 0 -4px 0";
        cell.classList.add("cells");
        gridContainer.appendChild(cell);
    }
}

const cells = document.querySelectorAll(".cells");

// Change cell color on hover
cells.forEach((cell) => {
    cell.addEventListener("mouseover", function(e) {
        let red = Math.random() * 255;
        let green = Math.random() * 255;
        let blue = Math.random() * 255;
        e.target.style["background-color"] = `rgb(${red}, ${green}, ${blue})`
    })
})