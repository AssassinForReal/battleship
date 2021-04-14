import { context } from '../components/app.js'

export const updateFooters = () => {
  context.ui.hComputerFooter.textContent = `Score: ${context.playerHits}/${context.availableHits}`
  context.ui.hPlayerFooter.textContent = `Score: ${context.computerHits}/${context.availableHits}`
}
