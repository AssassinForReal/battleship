import { context } from '../components/app.js'

export const stopGame = () => {
  context.gameStarted = false
  context.gameEnded = true
  context.ui.hBtnStart.textContent = 'Restart'
  context.ui.hBtnStart.disabled = false
  context.ui.hStatusBar.textContent = ''
}
