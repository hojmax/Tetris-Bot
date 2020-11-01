let grid, queue, hold, bag, clearedLines = 0

function resetTetris() {
  bag = []
  queue = []
  hold = undefined
  fillQueue()
  grid = getEmptyGrid()
}

function fillQueue() {
  while (queue.length < 7) {
    if (bag.length == 0) {
      bag = getTetrominoBag()
    }
    queue.push(bag.shift())
  }
}

function getEmptyGrid() {
  let output = []
  for (let y = 0; y < 20; y++) {
    output.push([])
    for (let x = 0; x < 10; x++) {
      output[y].push(-1)
    }
  }
  return output
}

function tetrisClear() {
  grid.splice(16, 4)
  for (let i = 0; i < 4; i++) {
    grid.unshift([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
  }
  clearedLines += 4
}

function getTetrominoToGrid(x, y, type, rotation, grid) {
  let output = grid.map(e => e.slice())
  for (block of tetrominoCoordinates[type][rotation]) {
    output[y + block.y][x + block.x] = type
  }
  return output
}

function getTetrominoBag() {
  let types = [0, 1, 2, 3, 4, 5, 6]
  let output = []
  while (types.length > 0) {
    let index = Math.floor(Math.random() * types.length)
    output.push(types.splice(index, 1)[0])
  }
  return output
}