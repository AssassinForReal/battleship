export const renderField = (hField, fieldWidth, fieldHeight, field) => {
  for (let y = 0; y < fieldHeight; y++) {
    for (let x = 0; x < fieldWidth; x++) {
      const hTile = hField.querySelector(`.tile[data-x='${x}'][data-y='${y}']`)

      if (field[y][x] === 1) {
        hTile.classList.add('selected')
      } else {
        hTile.classList.remove('selected')
      }
    }
  }
}
