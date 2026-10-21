// Variables - Query Selectors
const csBtn = document.querySelector("button")
const colourInput = document.querySelector("input[type='color']")
const select = document.querySelector("select")


//Event Listener for button click - calls(fetch) color Scheme API
csBtn.addEventListener("click", () =>{
    // Query selectors
    const colour = colourInput.value.slice(1)
    const mode = select.value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colour}&mode=${mode}&count=5`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        renderColours(data)
    })
})

// Render Colours Function and Copy Hex to Clipboard Functions
const csGrid = document.getElementById("cs-grid")

function renderColours(data) {
    csGrid.innerHTML = data.colors.map(color => `
        <div class="color-swatch" data-hex="${color.hex.value}">
            <div class="color-swatch-color" style="background-color: ${color.hex.value}"></div>
            <p>${color.hex.value}</p>
        </div>
    `).join("")
}

csGrid.addEventListener("click", (e) => {
    const swatch = e.target.closest(".color-swatch")
    if (!swatch) return
    copyColor(swatch.dataset.hex)
})

function copyColor(hex) {
    navigator.clipboard.writeText(hex)
        .then(() => {
            alert(`${hex} copied to clipboard!`)
        })
        .catch(error => {
            console.error("Failed to copy colour:", error)
        })
}
