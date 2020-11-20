import Renderer from './renderer/renderer.js'
import { app } from './components/app.js'

export const renderApp = () => {
  const appRoot = document.getElementById('app-root')
  appRoot.innerHTML = ''

  const renderStartTime = new Date().getTime()
  Renderer.render(appRoot, app)
  const renderEndTime = new Date().getTime()

  const renderTime = renderEndTime - renderStartTime
  console.log(`Rendered in ${renderTime} ms`)
}

renderApp()
