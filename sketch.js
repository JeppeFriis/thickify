//======

function getPixelColor(x, y) {
  let i = cartesianToIndex(x, y)
  let color = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]
  return color;
}

function getAveragePixelColor(x, y, size) {
  let averageColor = [0, 0, 0, 0]
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let color = getPixelColor(x + j, y + i)
      for (let k = 0; k < 4; k++) {
        averageColor[k] += color[k]
      }
    }
  }
  return averageColor.map(x => x / Math.pow(size, 2))
}

function setPixelColor(x, y, color) {
  let index = cartesianToIndex(x, y)
  for (let i = 0; i < 4; i++) {
    pixels[index + i] = color[i]
  }
}

function cartesianToIndex(x, y) {
  return 4 * (y * width + x);
}

//=======

let img;
let pixelationSlider
let sizeSlider
let pixelatedAreas = []


function setup() {
  input = createFileInput(handleFile);
  input.position(0, 0)
  background(255)
  noFill()
}

function draw() {
  if (img) {
    image(img, 0, 0)
    drawPixelatedAreas()
    rect(mouseX - sizeSlider.value() / 2, mouseY - sizeSlider.value() / 2, sizeSlider.value(), sizeSlider.value())
  }
}

function drawPixelatedAreas() {
  console.log(pixelatedAreas.length)
  for (let e of pixelatedAreas) {
    pixelateArea(e[0], e[1], e[2], e[3], e[4])
  }
}

function mouseClicked() {
  if (img && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    console.log("true")
    pixelatedAreas.push([Math.round(mouseX) - sizeSlider.value() / 2, Math.round(mouseY) - sizeSlider.value() / 2, Math.round(mouseX) + sizeSlider.value() / 2, Math.round(mouseY) + sizeSlider.value() / 2, pixelationSlider.value()])
  }
}

function pixelateArea(x1, y1, x2, y2, pixelation) {
  loadPixels()
  for (let i = y1; i <= y2 - pixelation; i += pixelation) {
    for (let j = x1; j <= x2 - pixelation; j += pixelation) {
      let color = getAveragePixelColor(j, i, pixelation)
      for (let k = 0; k < pixelation; k++) {
        for (let l = 0; l < pixelation; l++) {
          setPixelColor(j + l, i + k, color)
        }
      }
    }
  }
  updatePixels()
}

function handleFile(file) {
  print(file);
  pixelatedAreas = []
  if (file.type == 'image') {
    img = createImg(file.data, "gg");
    img.hide();
    cnv = createCanvas(img.width, img.height);
    image(img, 0, 0);
    pixelationSlider = createSlider(5, 25, 10, 1)
    pixelationSlider.position(30, img.height + 10)
    sizeSlider = createSlider(6, 100, 50, 2)
    sizeSlider.position(pixelationSlider.x + pixelationSlider.width + 10, img.height + 10)
    input.position(img.width / 2 - input.width / 2, img.height + 30)
  } else {
    img = null;
  }
}
