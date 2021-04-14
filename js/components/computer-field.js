import { datasetParseInt } from '../battleships/dataset-parse.js'
import { updateFooters } from '../battleships/misc.js'
import { nextMove } from '../battleships/next-move.js'
import { renderPick } from '../battleships/render-pick.js'
import { stopGame } from '../battleships/stop-game.js'
import { context } from './app.js'
import { field } from './field.js'

export const computerField = () => {
  const hComputerField = field()

  hComputerField.addEventListener('click', event => {
    if (!context.gameStarted) return
    if (context.currentMove !== 1) return

    const hTile = event.target
    if (!('x' in hTile.dataset) || !('y' in hTile.dataset)) return

    const { playerPicks } = context
    const { x, y } = datasetParseInt(hTile.dataset)

    if (playerPicks[y][x] !== 0) return

    const { field: computerField } = context.computerFieldState
    const pick = { x, y }

    if (computerField[y][x] === 0) {
      playerPicks[y][x] = 1
      pick.hit = false
    } else {
      playerPicks[y][x] = 2
      pick.hit = true
    }

    renderPick(hComputerField, pick)

    if (pick.hit) {
      context.playerHits++
      updateFooters()

      if (context.playerHits === context.availableHits) {
        setTimeout(() => {
          alert('You have won!')
        }, 50)
        
        stopGame()
        return
      }

      context.currentMove++
    }

    nextMove()
  })

  return hComputerField
}
