import { datasetParseInt } from './dataset-parse.js'
import { removeShip } from './remove-ship.js'

export const renderShips = (hField, ships) => {
  hField.querySelectorAll('.tile.selected').forEach(hTile => {
    const {
      shipX, shipY,
      shipSize, shipDirection
    } = datasetParseInt(hTile.dataset)

    if (
      shipX !== undefined && shipY !== undefined
      && shipSize !== undefined && shipDirection !== undefined
    ) {
      removeShip(hField, { x: shipX, y: shipY, size: shipSize, direction: shipDirection })
    }
  })

  ships.forEach(ship => {
    renderShip(hField, ship)
  })
}

export const renderShip = (hField, ship) => {
  const { x, y, size, direction } = ship

  for (let i = 0; i < size; i++) {
    const shipTileX = x + i * -~(-direction)
    const shipTileY = y + i * direction

    const hShipTile = hField.querySelector(`.tile[data-x='${shipTileX}'][data-y='${shipTileY}']`)

    if (hShipTile) {
      hShipTile.classList.add('selected')
      hShipTile.dataset.shipX = x
      hShipTile.dataset.shipY = y
      hShipTile.dataset.shipSize = size
      hShipTile.dataset.shipDirection = direction
    }
  }
}
