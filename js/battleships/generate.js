import { times } from '../renderer/renderer.js'
import { randomInt } from './random.js'
import { validateMove } from './validate-move.js'

export const generate = (width, height, ships) => {
  const field = (
    times(height, () => (
      times(width, () => 0)
    ))
  )

  const generatedShips = []

  Object.entries(ships).reverse().forEach(([shipSize, shipCount]) => {
    times(shipCount, () => {
      let placed = false

      while (!placed) {
        const direction = randomInt(0, 1)

        const randomX = randomInt(0, width - 1 - shipSize * -~(-direction))
        const randomY = randomInt(0, height - 1 - shipSize * direction)

        if (validateMove(
          field, width, height, randomX, randomY, shipSize, direction
        )) {
          generatedShips.push({
            x: randomX,
            y: randomY,
            size: shipSize,
            direction
          })

          for (let i = 0; i < shipSize; i++) {
            field[randomY + i * direction][randomX + i * -~(-direction)] = 1
          }

          placed = true
        }
      }
    })
  })

  return { field, ships: generatedShips }
}
