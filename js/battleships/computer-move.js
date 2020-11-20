import { context, kFieldHeight, kFieldWidth } from '../components/app.js'
import { updateFooters } from './misc.js'
import { nextMove } from './next-move.js'
import { randomInt } from './random.js'
import { renderPick } from './render-pick.js'
import { analyseField } from './solving-algorithm.js'
import { stopGame } from './stop-game.js'
import { validateMove } from './validate-move.js'

export const computerMove = () => {
  setTimeout(() => {
    const deductedPick = smartPick(
      context.computerPicks,
      context.fieldWidth,
      context.fieldHeight,
      context.ships
    )

    const pickHit = pick(deductedPick.x, deductedPick.y)

    if (pickHit) {
      context.computerHits++
      updateFooters()

      if (context.computerHits === context.availableHits) {
        setTimeout(() => {
          alert('Wygrał komputer!')
        }, 50)

        const hComputerField = context.ui.hComputerField
        const computerField = context.computerFieldState.field

        for (let y = 0; y < kFieldHeight; y++) {
          for (let x = 0; x < kFieldWidth; x++) {
            if (computerField[y][x] === 1) {
              const hTile = hComputerField.querySelector(
                `.tile[data-x='${x}'][data-y='${y}']`
              )

              if (hTile) {
                hTile.classList.add('selected')
              }
            }
          }
        }

        stopGame()
        return
      }

      context.currentMove++
    }

    nextMove()
  }, 1000)
}

export const smartPick = (picks, fieldWidth, fieldHeight, availableShips) => {
  const {
    potentialPicks,
    wantedShipSize
  } = analyseField(
    picks,
    fieldWidth,
    fieldHeight,
    availableShips
  )

  if (potentialPicks.length === 0) {
    return randomPick(picks, fieldWidth, fieldHeight, wantedShipSize)
  }
  return potentialPicks[randomInt(0, potentialPicks.length - 1)]
}

const pick = (x, y) => {
  const { computerPicks } = context
  const { field: playerField } = context.playerFieldState
  const pick = { x, y, hit: false }

  if (playerField[y][x] === 0) {
    computerPicks[y][x] = 2
  } else {
    computerPicks[y][x] = 1
    pick.hit = true
  }

  renderPick(context.ui.hPlayerField, pick)
  return pick.hit
}

const getMaxShipSizeAtPoint = (computerPicks, fieldWidth, fieldHeight, shipX, shipY) => {
  let maxShipSize = 0

  // Horizontal scan
  let shipLeft = 0
  let shipRight = 0

  for (let x = 0; x < fieldWidth; x++) {
    if (computerPicks[shipY][x] === 2) {
      if (shipLeft <= shipX && shipRight >= shipX) {
        maxShipSize = Math.max(maxShipSize, shipRight - shipLeft + 1)
      }
      shipLeft = x
    }
    shipRight = x
  }

  maxShipSize = Math.max(maxShipSize, shipRight - shipLeft + 1)

  // Vertical scan
  let shipTop = 0
  let shipBottom = 0

  for (let y = 0; y < fieldHeight; y++) {
    if (computerPicks[y][shipX] === 2) {
      if (shipTop <= shipY && shipBottom >= shipY) {
        maxShipSize = Math.max(maxShipSize, shipBottom - shipTop + 1)
      }
      shipTop = y
    }
    shipBottom = y
  }

  maxShipSize = Math.max(maxShipSize, shipBottom - shipTop + 1)

  return maxShipSize
}

const randomPick = (computerPicks, fieldWidth, fieldHeight, wantedShipSize) => {
  while (true) {
    const x = randomInt(0, fieldWidth - 1)
    const y = randomInt(0, fieldHeight - 1)

    if (computerPicks[y][x] !== 0) continue
    if (!validateMove(computerPicks, fieldWidth, fieldHeight, x, y, 1, 0)) continue
    if (getMaxShipSizeAtPoint(computerPicks, fieldWidth, fieldHeight, x, y) < wantedShipSize) continue
    return { x, y }
  }
}