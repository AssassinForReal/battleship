import { component } from '../renderer/renderer.js'
import { header } from './header.js'
import { container } from './container.js'
import { sidebar } from './sidebar.js'
import { fieldColumn } from './field-column.js'
import { playerField } from './player-field.js'
import { computerField } from './computer-field.js'
import { emptyField } from '../battleships/empty-field.js'
import { generate } from '../battleships/generate.js'
import { deepClone } from '../battleships/deep-clone.js'
import { footer } from './footer.js'

export const kFieldWidth = 10
export const kFieldHeight = 10

export const kDirectionHorizontal = 0
export const kDirectionVertical = 1

const kAvailableShips = {
  1: 4,
  2: 3,
  3: 2,
  4: 1
}

const initialContext = {
  fieldWidth: kFieldWidth,
  fieldHeight: kFieldHeight,
  ships: Object.assign({}, kAvailableShips),
  playerSelection: {
    hSelectedShip: null,
    shipSize: 0,
    shipDirection: 0,
    shipHoverPosition: {
      x: -1,
      y: -1
    },
    availableShips: Object.assign({}, kAvailableShips)
  },
  playerFieldState: {
    field: emptyField(kFieldWidth, kFieldHeight)
  },
  computerFieldState: {
    field: []
  },
  ui: {
    hShipContainer: null,
    hPlayerField: null,
    hComputerField: null,
    hBtnStart: null,
    hBtnRandom: null,
    hStatusBar: null,
    hPlayerFooter: null,
    hComputerFooter: null
  },
  gameStarted: false,
  gameEnded: false,
  currentMove: 0,
  playerHits: 0,
  computerHits: 0,
  availableHits: Object.entries(kAvailableShips)
    .reduce((accumulator, [size, count]) => accumulator + size * count, 0),
  playerPicks: emptyField(kFieldWidth, kFieldHeight),
  computerPicks: emptyField(kFieldWidth, kFieldHeight),
}

export let context = deepClone(initialContext)

export const resetContext = () => {
  context = deepClone(initialContext)
}

export const app = () => {
  const hPlayerField = playerField()
  const hComputerField = computerField()

  Object.assign(context.ui, { hPlayerField, hComputerField })

  const {
    fieldWidth,
    fieldHeight,
    ships
  } = context

  context.computerFieldState.field = generate(fieldWidth, fieldHeight, ships).field

  context.ui.hPlayerFooter = footer()
  context.ui.hComputerFooter = footer()

  const hPlayerFieldColumn = fieldColumn('Gracz', hPlayerField, context.ui.hPlayerFooter)
  const hComputerFieldColumn = fieldColumn('Komputer', hComputerField, context.ui.hComputerFooter)

  return [
    header,
    container(
      sidebar,
      component('div', [
        hPlayerFieldColumn, hComputerFieldColumn
      ], { className: 'field-container' })
    )
  ]
}
