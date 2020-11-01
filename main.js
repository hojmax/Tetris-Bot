let scale = 30,
  searchDepth = 3

function setup() {
  createCanvas(22 * scale, 20 * scale + 1)
  textSize(32)
  resetTetris()
  drawInterface()
}

function keyPressed() {
  if (keyCode == 32) {
    update()
  }
}

function draw() {
  if (keyIsDown(82)) {
    update()
  }
}

function update() {
  let inputQueue = queue
  let hasMadeMove = false
  if (canTetrisClear(grid)) {
    if (queue[0] == 0) {
      tetrisClear()
      queue.shift()
      fillQueue()
      hasMadeMove = true
    } else {
      inputQueue = inputQueue.filter(x => x != 0)
    }
  }
  if (!hasMadeMove) {
    let heightMap = getHeightMap(grid)
    let turn = getBestMove(grid, heightMap, inputQueue)
    if (turn.grid != undefined) {
      grid = turn.grid
      if (turn.shouldHold) {
        let holdChange = getHoldChange(queue, hold)
        queue = holdChange.queue
        hold = holdChange.hold
      }
      queue.shift()
      fillQueue()
    } else {
      console.log("No valid moves")
    }
  }
  drawInterface()
}