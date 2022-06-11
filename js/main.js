let currentColor = "#000000";
let currentMode = "color";
let currentSize = 16;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activeButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const colorPicker = document.querySelector("#colorPicker");
const colorBtn = document.querySelector("#colorBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const sizeValue = document.querySelector("#sizeValue");
const sizeSlider = document.querySelector("#sizeSlider");
const showGrid = document.querySelector("#showGrid");
const clearBtn = document.querySelector("#clearBtn");
const grid = document.querySelector("#grid__container");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorPicker.onclick = (e) => setCurrentMode("color");
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
sizeSlider.oninput = (e) => changeSize(e.target.value);
showGrid.onclick = () => toggleGrid();
clearBtn.onclick = () => clearGrid();

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  clearGrid();
}

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`;
}

function clearGrid() {
  grid.innerText = '';
  setupGrid(currentSize);
  toggleGrid();
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  
  for (let i = 1; i <= size * size; i++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add("grid-item");
      gridItem.addEventListener("mouseover", changeColor);
      grid.append(gridItem);
  }
  toggleGrid();
}

function changeColor(e) {
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB}`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  }
}

function activeButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newMode === 'color') {
    colorBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}

function toggleGrid() {
  const gridItem = document.querySelectorAll(".grid-item");

  if (showGrid.classList.contains("active")){
    showGrid.classList.remove("active");
    gridItem.forEach(gridItem_1 => 
      gridItem_1.classList.remove('active')
    );
  } else {
    showGrid.classList.add("active");
    gridItem.forEach(gridItem_1 => 
      gridItem_1.classList.add('active')
    );
  }
}

setupGrid(currentSize);
activeButton(currentMode);