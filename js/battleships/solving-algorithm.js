// Battlefield solving algorithm //

/**
 * Returns an object containing:
 * - an array of points { x, y } that have the most
 *   probability of hitting a ship mast
 * - size of the largest ship that has not been found yet
 * 
 * Returns an empty array if there are no potential picks with
 * high probability or if the field is already solved
 * 
 * @param {Array} field
 * Two dimentional array representing
 * a picking field where:
 * 0 - not checked
 * 1 - mast present
 * 2 - mast absent
 * 
 * @param {Number} fieldWidth Width of the field
 * @param {Number} fieldHeight Height of the field
 * @param {Object} ships
 * An object representing ships available
 * in game where the key is the ship size
 * and the value is the count
 */
export const analyseField = (field, fieldWidth, fieldHeight, ships) => {
  // Array of masts represented as arrays of connected points
  const foundMasts = getFoundMasts(field, fieldWidth, fieldHeight)

  // Algorithm tries to solve the field finding the largest ships first
  // Initially wantedShipSize contains the largest ship size available in the game
  let wantedShipSize = parseInt(Object.keys(ships).reverse()[0])

  // If there are no hit masts there is no pick with high probability
  if (foundMasts.length === 0) return { potentialPicks: [], wantedShipSize }


  // Initially wantedShipSize contains the count of the largest ships
  let wantedShipCount = ships[wantedShipSize]

  // Array of found ships
  // e.g.:
  // [
  //   { x: 1, y: 3, shipSize: 2, direction: 0},
  //   { x: 7, y: 1, shipSize: 3, direction: 1},
  // ]
  const foundShips = getFoundShips(foundMasts)

  const potentialPicks = []

  // Find the largest ship size that has not been sank yet
  while (true) {
    let actualShipCount = 0

    for (const foundShip of foundShips) {
      if (foundShip.shipSize === wantedShipSize) {
        actualShipCount++
      }
    }

    if (actualShipCount !== wantedShipCount) {
      break
    }

    wantedShipSize--

    if (wantedShipSize === 0) {
      // No ships to be found
      // The field is solved
      return { potentialPicks: [], wantedShipSize }
    }

    wantedShipCount = ships[wantedShipSize]
  }

  for (const foundShip of foundShips) {
    if (foundShip.shipSize < wantedShipSize) {
      // Every ship that has size less than the largest ship
      // that has not been found yet is suspected of being the wanted one

      const { x, y, shipSize, direction } = foundShip

      // Horizontal or 1x1
      // Check the leftmost and the rightmost tile
      if (direction === 0 || shipSize === 1) {
        const leftX = x - 1
        const rightX = x + shipSize

        if (isMoveValid(field, fieldWidth, fieldHeight, leftX, y, foundShip)) {
          potentialPicks.push({ x: leftX, y })
        }

        if (isMoveValid(field, fieldWidth, fieldHeight, rightX, y, foundShip)) {
          potentialPicks.push({ x: rightX, y })
        }
      }

      // Vertical or 1x1
      // Check the topmost and the bottommost tile
      if (direction === 1 || shipSize === 1) {
        const topY = y - 1
        const bottomY = y + shipSize

        if (isMoveValid(field, fieldWidth, fieldHeight, x, topY, foundShip)) {

          potentialPicks.push({ x, y: topY })
        }

        if (isMoveValid(field, fieldWidth, fieldHeight, x, bottomY, foundShip)) {
          potentialPicks.push({ x, y: bottomY })
        }
      }
    }
  }

  return { potentialPicks, wantedShipSize }
}

/**
 * Returns an array of masts represented
 * as an array of coordinates { x, y }
 * 
 * @param {Array} field
 * Two dimentional array representing
 * a picking field where:
 * 0 - not checked
 * 1 - mast present
 * 2 - mast absent
 * 
 * @param {Number} fieldWidth Width of the field
 * @param {Number} fieldHeight Height of the field
 */
export const getFoundMasts = (field, fieldWidth, fieldHeight) => {
  const visitedIndexes = []
  const foundMasts = []

  for (let y = 0; y < fieldHeight; y++) {
    for (let x = 0; x < fieldWidth; x++) {
      if (field[y][x] !== 1) continue
      if (visitedIndexes.includes(x + y * fieldWidth)) continue

      foundMasts.push(getFoundMastsImpl(field, fieldWidth, fieldHeight, x, y, visitedIndexes))
    }
  }

  return foundMasts
}

/**
 * Searches for connected masts recursively
 * and returns an array of their coordinates { x, y }
 * 
 * @param {Array} field
 * Two dimentional array representing
 * a picking field where:
 * 0 - not checked
 * 1 - mast present
 * 2 - mast absent
 * 
 * @param {Number} fieldWidth Width of the field
 * @param {Number} fieldHeight Height of the field
 * @param {Number} x The x-coordinate to check
 * @param {Number} y The y-coordinate to check
 * @param {Array} visitedIndexes
 * Array containing two dimentional coordinates
 * mapped to one dimentional index
 */
export const getFoundMastsImpl = (field, fieldWidth, fieldHeight, x, y, visitedIndexes) => {
  if (field[y][x] !== 1) return []
  if (visitedIndexes.includes(x + y * fieldWidth)) return []
  visitedIndexes.push(x + y * fieldWidth)

  const ts = [{ x, y }]

  if ((x + 1) < fieldWidth && !visitedIndexes.includes(x + 1 + y * fieldWidth)) {
    if (field[y][x + 1] === 1) {
      ts.push(...getFoundMastsImpl(field, fieldWidth, fieldHeight, x + 1, y, visitedIndexes))
      visitedIndexes.push(x + 1 + y * fieldWidth)
    }
  }

  if ((y + 1) < fieldHeight && !visitedIndexes.includes(x + (y + 1) * fieldWidth)) {
    if (field[y + 1][x] === 1) {
      ts.push(...getFoundMastsImpl(field, fieldWidth, fieldHeight, x, y + 1, visitedIndexes))
      visitedIndexes.push(x + (y + 1) * fieldWidth)
    }
  }

  return ts
}

/**
 * Returns an array of ships { x, y, shipSize, direction, masts }
 * based on masts
 * 
 * @param {Array} foundMasts 
 * An array of masts represented
 * as an array of coordinates { x, y }
 */
export const getFoundShips = (foundMasts) => {
  const foundShips = []

  for (const masts of foundMasts) {
    const shipSize = masts.length
    const { x, y } = masts[0]
    let direction = 0

    if (shipSize > 1) {
      if (masts[0].x === masts[1].x) {
        direction = 1
      }
    }

    foundShips.push({ x, y, shipSize, direction, masts })
  }

  return foundShips
}

/**
 * Returns true if around a location are masts that are not
 * part of the provided ship
 * false otherwise
 */
export const areOtherShipsNearby = (field, fieldWidth, fieldHeight, shipX, shipY, ship) => {
  for (let y = shipY - 1; y < shipY + 2; y++) {
    if (y < 0 || y >= fieldHeight) continue

    for (let x = shipX - 1; x < shipX + 2; x++) {
      if (x < 0 || x >= fieldWidth) continue

      if (field[y][x] === 1) {
        let isMastOwn = false

        for (const mast of ship.masts) {
          if (mast.x === x && mast.y === y) {
            isMastOwn = true
          }
        }

        if (!isMastOwn) {
          return true
        }
      }
    }
  }

  return false
}

/**
 * Returns true if a ship can be hidden at a location based on previous picks
 * false otherwise
 */
export const isMoveValid = (field, fieldWidth, fieldHeight, shipX, shipY, ship) => {
  if (shipX < 0 || shipX >= fieldWidth) return false
  if (shipY < 0 || shipY >= fieldHeight) return false
  if (field[shipY][shipX] !== 0) return false
  if (areOtherShipsNearby(field, fieldWidth, fieldHeight, shipX, shipY, ship)) return false
  return true
}