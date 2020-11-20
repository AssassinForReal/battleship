import { context } from '../components/app.js'
import { computerMove } from './computer-move.js'

export const nextMove = () => {
  context.currentMove = (context.currentMove + 1) % 2

  if (context.currentMove) {
    context.ui.hStatusBar.innerText = 'Teraz Twoja kolej'
    context.ui.hComputerField.classList.add('active-field')
  } else {
    context.ui.hStatusBar.innerText = 'Teraz kolej komputera'
    context.ui.hComputerField.classList.remove('active-field')
    computerMove()
  }
}
