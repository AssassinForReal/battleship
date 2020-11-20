import { context } from '../components/app.js'

export const updateFooters = () => {
  context.ui.hComputerFooter.textContent = `Trafionych masztów: ${context.playerHits}/${context.availableHits}`
  context.ui.hPlayerFooter.textContent = `Trafionych masztów: ${context.computerHits}/${context.availableHits}`
}
