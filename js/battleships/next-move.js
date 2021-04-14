import { context } from '../components/app.js'
import { computerMove } from './computer-move.js'

export const nextMove = () => {
  context.currentMove = (context.currentMove + 1) % 2

  if (context.currentMove) {
    context.ui.hStatusBar.innerText = 'Your turn'
    context.ui.hComputerField.classList.add('active-field')
  } else {
    context.ui.hStatusBar.innerText = 'Computer\'s turn'
    context.ui.hComputerField.classList.remove('active-field')
    computerMove()
  }
}
