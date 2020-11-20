import { field } from './field.js'
import { context } from './app.js'
import { validateMove } from '../battleships/validate-move.js'
import { renderShip } from '../battleships/render-ships.js'
import { datasetParseInt } from '../battleships/dataset-parse.js'
import { removeShip } from '../battleships/remove-ship.js'

export const playerField = () => {
  const hPlayerField = field()

  const renderSelection = (event) => {
    if (context.gameStarted) return
    
    const {
      hSelectedShip,
      shipSize,
      shipDirection: direction
    } = context.playerSelection

    if (hSelectedShip === null || shipSize === 0) return

    hPlayerField.querySelectorAll('.tile').forEach(tile => {
      tile.style.backgroundColor = null
    })

    const hTile = event.target
    if (!('x' in hTile.dataset) || !('y' in hTile.dataset)) return

    const {
      fieldWidth,
      fieldHeight,
      playerSelection
    } = context

    const maxX = fieldWidth - shipSize * -~(-direction)
    const maxY = fieldHeight - shipSize * direction

    const hoverX = Math.min(parseInt(hTile.dataset.x), maxX)
    const hoverY = Math.min(parseInt(hTile.dataset.y), maxY)

    playerSelection.shipHoverPosition = { x: hoverX, y: hoverY }

    const { field: playerField } = context.playerFieldState

    const isMoveValid = validateMove(
      playerField, fieldWidth, fieldHeight, hoverX, hoverY, shipSize, direction
    )

    for (let i = 0; i < shipSize; i++) {
      const shipTileX = hoverX + i * -~(-direction)
      const shipTileY = hoverY + i * direction

      const hShipTile = hPlayerField.querySelector(`.tile[data-x='${shipTileX}'][data-y='${shipTileY}']`)

      if (hShipTile) {
        if (isMoveValid) {
          hShipTile.style.backgroundColor = '#888'
        } else {
          hShipTile.style.backgroundColor = '#766'
        }
      }
    }
  }

  hPlayerField.addEventListener('mouseleave', () => {
    const { playerSelection } = context
    playerSelection.shipHoverPosition = { x: -1, y: -1 }
  })

  hPlayerField.addEventListener('mouseover', renderSelection)

  hPlayerField.addEventListener('mousedown', event => {
    if (context.gameStarted || context.gameEnded) return
    const mouseBtnPrimary = 0
    const mouseBtnSecondary = 2

    const { playerSelection } = context

    if (event.button === mouseBtnPrimary) {
      const { x, y } = playerSelection.shipHoverPosition
      const { shipDirection: direction, shipSize } = playerSelection

      if (event.target.classList.contains('selected')) {
        const hTile = event.target
        const {
          shipX, shipY,
          shipSize, shipDirection
        } = datasetParseInt(hTile.dataset)

        for (let i = 0; i < shipSize; i++) {
          const shipTileX = shipX + i * -~(-shipDirection)
          const shipTileY = shipY + i * shipDirection
          context.playerFieldState.field[shipTileY][shipTileX] = 0
        }

        removeShip(hPlayerField, {
          x: shipX, y: shipY,
          size: shipSize, direction: shipDirection
        })

        if (!(shipSize in playerSelection.availableShips)) {
          playerSelection.availableShips[shipSize] = 0
        }

        playerSelection.availableShips[shipSize]++
        context.ui.hShipContainer.render()
        return
      }

      if (x !== -1 && y !== -1) {
        const { fieldWidth, fieldHeight } = context
        const { field } = context.playerFieldState

        const isMoveValid = validateMove(
          field, fieldWidth, fieldHeight, x, y, shipSize, direction
        )

        if (isMoveValid) {
          for (let i = 0; i < shipSize; i++) {
            const shipTileX = x + i * -~(-direction)
            const shipTileY = y + i * direction
            field[shipTileY][shipTileX] = 1
          }

          renderShip(hPlayerField, { x, y, size: shipSize, direction })

          playerSelection.availableShips[shipSize]--
          document.querySelector('.sidebar .ship-container').render()
        }
      }
    } else if (event.button === mouseBtnSecondary) {
      playerSelection.shipDirection = -~(-playerSelection.shipDirection)
    }

    renderSelection(event)
  })

  hPlayerField.addEventListener('contextmenu', event => event.preventDefault())

  return hPlayerField
}
