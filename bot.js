function getGridScore(grid, heightMap) {
  let score = 0
  let hasFlatArea = false
  let low = heightMap[9]
  let high = heightMap[9]
  for (let x = 1; x < 9; x++) {
    low = min(heightMap[x], low)
    high = max(heightMap[x], high)
    diff = abs(heightMap[x] - heightMap[x + 1])
    if (diff > 1) {
      score += diff * diff
    } else if (diff == 0) {
      hasFlatArea = true
    }
  }
  score += abs((high - low) - 1)
  return hasFlatArea ? score - 5 : score
}

function getBestMove(grid, heightMap, queue) {
  let bestGrid
  let lowestScore = Infinity
  let moveHold = false

  function treeSearch(queue, hold, grid, firstHold, firstGrid, heightMap, depth) {
    if (depth == searchDepth) {
      let score = getGridScore(grid, heightMap)
      if (score < lowestScore) {
        lowestScore = score
        bestGrid = firstGrid
        moveHold = firstHold
      }
    } else {
      let workingQueue = queue
      let workingHold = hold
      for (let toHold = 0; toHold <= 1; toHold++) {
        if (toHold == 1) {
          let pieces = getHoldChange(queue, hold)
          workingQueue = pieces.queue
          workingHold = pieces.hold
        }
        for (let rotation = 0; rotation < getPossiblePlacements(workingQueue[0]).length; rotation++) {
          let bounds = getPossiblePlacements(workingQueue[0])[rotation]
          for (let x = bounds[0]; x <= bounds[1]; x++) {
            let nextGrid = getPossibleGrid(x, -1, workingQueue[0], rotation, grid, heightMap)
            if (nextGrid != undefined) {
              let nextQueue = workingQueue.slice()
              let nextHeightMap = getHeightMap(nextGrid)
              nextQueue.shift()
              treeSearch(nextQueue, workingHold, nextGrid, depth == 0 ? toHold == 1 : firstHold, depth == 0 ? nextGrid : firstGrid, nextHeightMap, depth + 1)
            }
          }
        }
      }
    }
  }

  treeSearch(queue, hold, grid, false, undefined, heightMap, 0)
  return {
    grid: bestGrid,
    shouldHold: moveHold
  }
}

function getHoldChange(queue, hold) {
  let queueCopy = queue.slice()
  if (hold == undefined) {
    return {
      hold: queueCopy.shift(),
      queue: queueCopy
    }
  } else {
    let temp = queueCopy[0]
    queueCopy[0] = hold
    return {
      hold: temp,
      queue: queueCopy
    }
  }
}

function getPossibleGrid(x, y, type, rotation, grid, heightMap) {
  let comparison = undefined
  for (block of tetrominoShadows[type][rotation]) {
    let fallDistance = 19 - heightMap[x + block.x] - (y + block.y)
    if (comparison == undefined) {
      if (isOutsideGrid(x, y + fallDistance, type, rotation)) {
        return undefined
      } else {
        comparison = fallDistance
      }
    } else if (comparison != fallDistance) {
      return undefined
    }
  }
  return getTetrominoToGrid(x, y + comparison, type, rotation, grid)
}

function isOutsideGrid(x, y, type, rotation) {
  // Only needs to check top border. The other cases are handled by inner logic.
  for (block of tetrominoCoordinates[type][rotation]) {
    if (block.y + y < 0) {
      return true
    }
  }
  return false
}

function getHeightMap(grid) {
  output = []
  for (let x = 0; x < 10; x++) {
    output.push(getColoumnHeight(x, grid))
  }
  return output
}

function getColoumnHeight(x, grid) {
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x] != -1) {
      return 20 - y
    }
  }
  return 0
}

function canTetrisClear(grid) {
  for (let y = 16; y < 20; y++) {
    for (let x = 1; x < 10; x++) {
      if (grid[y][x] == -1) {
        return false
      }
    }
  }
  return true
}