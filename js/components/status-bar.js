import { component } from '../renderer/renderer.js'
import { context } from './app.js'

export const statusBar = () => {
  const hStatusBar = component('div', null, { className: 'status-bar' })
  context.ui.hStatusBar = hStatusBar
  return hStatusBar
}

