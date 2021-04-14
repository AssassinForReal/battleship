import { generate } from '../battleships/generate.js'
import { updateFooters } from '../battleships/misc.js'
import { nextMove } from '../battleships/next-move.js'
import { randomInt } from '../battleships/random.js'
import { renderShips } from '../battleships/render-ships.js'
import { renderApp } from '../main.js'
import { component } from '../renderer/renderer.js'
import { context, resetContext } from './app.js'
import { shipContainer } from './ship-container.js'
import { statusBar } from './status-bar.js'

export const sidebar = () => {
  const hBtnStart = component('button', 'Start', { disabled: true })
  const hBtnRandom = component('button', 'Generate random ships')

  context.ui.hBtnStart = hBtnStart
  context.ui.hBtnRandom = hBtnRandom

  hBtnStart.addEventListener('click', () => {
    if (context.gameStarted) return

    if (context.gameEnded) {
      context.gameEnded = false
      hBtnRandom.disabled = false

      resetContext()
      renderApp()

    } else {
      context.gameStarted = true
      hBtnStart.disabled = true
      hBtnRandom.disabled = true

      updateFooters()

      context.currentMove = randomInt(0, 1)
      nextMove()
    }
  })

  hBtnRandom.addEventListener('click', () => {
    context.playerSelection.availableShips = {}
    context.ui.hShipContainer.render()

    const { fieldWidth, fieldHeight, ships } = context
    const { hPlayerField } = context.ui
    const { field, ships: randomShips } = generate(fieldWidth, fieldHeight, ships)
    context.playerFieldState.field = field

    hPlayerField.querySelectorAll('.tile').forEach(tile => {
      tile.style.backgroundColor = null
    })
    
    renderShips(hPlayerField, randomShips)
  })

  return component('aside',
    [
      component('div',
        [
          hBtnStart, hBtnRandom
        ], { className: 'button-container' }),
      statusBar,
      shipContainer
    ],
    { className: 'sidebar' }
  )
}
