export const renderPick = (hField, pick) => {
  const { x, y, hit } = pick
  const hShipTile = hField.querySelector(`.tile[data-x='${x}'][data-y='${y}']`)

  if (hShipTile) {
    hShipTile.classList.add('picked')
    if (hit) {
      hShipTile.innerHTML = 'X'
    } else {
      hShipTile.innerHTML = '&middot;'
    }
  }
}
