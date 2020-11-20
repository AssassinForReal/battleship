export const validateMove = (
  field,
  fieldWidth,
  fieldHeight,
  shipX,
  shipY,
  shipSize,
  shipDirection
) => {
  shipSize = parseInt(shipSize)
  shipDirection = shipDirection ? 1 : 0

  for (let y = shipY - 1; y < shipY + shipSize * shipDirection + 1 + -~(-shipDirection); y++) {
    if (y < 0 || y >= fieldHeight) continue

    for (let x = shipX - 1; x < shipX + shipSize * -~(-shipDirection) + 1 + shipDirection; x++) {
      if (x < 0 || x >= fieldWidth) continue

      if (field[y][x] === 1) {
        return false
      }
    }
  }

  return true
}
