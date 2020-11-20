import { component } from '../renderer/renderer.js'

export const container = (...children) => (
  component('div', children, { className: 'container' })
)
