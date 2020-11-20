export const removeShip = (hField, ship) => {
  const { x, y, size, direction } = ship

  for (let i = 0; i < size; i++) {
    const shipTileX = x + i * -~(-direction)
    const shipTileY = y + i * direction

    const hShipTile = hField.querySelector(`.tile[data-x='${shipTileX}'][data-y='${shipTileY}']`)

    if (hShipTile) {
      hShipTile.classList.remove('selected')
      hShipTile.removeAttribute('data-ship-x')
      hShipTile.removeAttribute('data-ship-y')
      hShipTile.removeAttribute('data-ship-size')
      hShipTile.removeAttribute('data-ship-direction')
    }
  }
}
