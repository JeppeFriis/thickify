// Helper functions

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




let img;

/*function preload() {
    img = loadImage('https://i.redd.it/cmi9z289res11.jpg');
}*/

function setup() {
    input = createFileInput(handleFile);
    input.position(0, 0);

    cnv = createCanvas(img.width, img.height);
    image(img, 0, 0);
}

function draw() {
    background(255);
    if (img) {
        image(img,0,0,width,height);
    }
}

function thiccFilter(centerX, centerY, radius, strength) {
    loadPixels()
    for (let x = centerX - radius; x < centerX + radius; x++) {
        for (let y = centerY - radius; y < centerY + radius; y++) {
            posX = x - centerX;
            posY = y - centerY; 
            
            // Hvis pixelen er indenfor radius
            if (Math.sqrt(Math.pow(centerY - y, 2) + Math.pow(centerX - x, 2)) <= radius) {

            }
        }
    }
    updatePixels()
}

function handleFile(file) {
    print(file);
    if (file.type == 'image'){
        img = createImg(file.data ''9);
        img.hide();        
    } else{
        img = null;
    }

    
}