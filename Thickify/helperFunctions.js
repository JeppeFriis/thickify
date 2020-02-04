function getPixelColor(x, y) {
    let i = cartesianToIndex(x, y)
    let color = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]
    return color
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
    return 4 * (y * width + x)
}
