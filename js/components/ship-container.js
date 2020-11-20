import { component, render, times } from '../renderer/renderer.js'
import { context } from './app.js'
import { ship } from './ship.js'

export const shipContainer = () => {
  const hShipContainer = component('div', null, { className: 'ship-container' })

  context.ui.hShipContainer = hShipContainer

  hShipContainer.render = () => {
    hShipContainer.innerHTML = ''

    const { playerSelection } = context
    const { availableShips: ships } = playerSelection

    let totalShips = 0

    render(hShipContainer,
      Object.entries(ships).reverse().map(([shipSize, shipCount], i) => (
        times(shipCount, () => {
          const hShip = ship(shipSize)

          if (totalShips === 0) {
            playerSelection.hSelectedShip = hShip
            playerSelection.shipSize = shipSize
            hShip.classList.add('selected')
          }

          hShip.addEventListener('click', () => {
            const hSelectedShips = document.querySelectorAll('.ship.selected')
            hSelectedShips.forEach(hSelectedShip => {
              hSelectedShip.classList.remove('selected')
            })
            playerSelection.hSelectedShip = hShip
            playerSelection.shipSize = shipSize
            hShip.classList.add('selected')
          })

          totalShips++
          return hShip
        })
      ))
    )

    if (totalShips === 0) {
      playerSelection.hSelectedShip = null
      playerSelection.shipSize = 0
      context.ui.hBtnStart.disabled = false
    } else {
      context.ui.hBtnStart.disabled = true
    }

    return hShipContainer
  }

  return hShipContainer.render()
}
