function drawInterface() {
  background(255)
  drawGrid(6, 0)
  drawPlacedBlocks(6, 0)
  drawQueue(17, 1)
  drawHold(1, 0)
}

function drawTetromino(x, y, type, rotation) {
  fill(getColor(type))
  noStroke()
  for (block of tetrominoCoordinates[type][rotation]) {
    rect(scale * (block.x + x), scale * (block.y + y), scale, scale)
  }
}

function drawPlacedBlocks(xGlobal, yGlobal) {
  noStroke()
  for ([y, row] of grid.entries()) {
    for ([x, block] of row.entries()) {
      if (block != -1) {
        fill(getColor(block))
        rect((x + xGlobal) * scale, (y + yGlobal) * scale, scale, scale)
      }
    }
  }
}

function drawGrid(x, y) {
  noStroke()
  fill(200)
  rect(x * scale, y * scale, 10 * scale, 20 * scale)
  stroke(125)
  for (let i = 0; i <= 10; i++) {
    line((x + i) * scale, y * scale, (x + i) * scale, (y + 20) * scale)
  }
  for (let i = 0; i <= 20; i++) {
    line(x * scale, (y + i) * scale, (x + 10) * scale, (y + i) * scale)
  }
}

function drawQueue(x, y) {
  for (let i = 0; i < 5; i++) {
    if (queue[i] == 0) {
      drawTetromino(x, y + i * 3 - 1, queue[i], 0)
    } else if (queue[i] == 3) {
      drawTetromino(x + 1, y + i * 3, queue[i], 0)
    } else {
      drawTetromino(x, y + i * 3, queue[i], 0)
    }
  }
}

function drawHold(x, y) {
  if (hold != undefined) {
    if (hold == 0) {
      drawTetromino(x, y, hold, 0)
    } else if (hold == 3) {
      drawTetromino(x + 2, y + 1, hold, 0)
    } else {
      drawTetromino(x + 1, y + 1, hold, 0)
    }
  }
}

function getColor(number) {
  switch (number) {
    case 0:
      return [68, 175, 247]
      break;
    case 1:
      return [34, 89, 222]
      break;
    case 2:
      return [237, 119, 51]
      break;
    case 3:
      return [246, 181, 50]
      break;
    case 4:
      return [104, 199, 18]
      break;
    case 5:
      return [198, 69, 166]
      break;
    case 6:
      return [233, 63, 52]
      break;
  }
}