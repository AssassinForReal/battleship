import { component } from '../renderer/renderer.js'

export const fieldColumn = (title, field, footer) => (
  component('div', [
    component('h2', title, { className: 'field-title' }),
    field,
    footer
  ], { className: 'field-column' })
)
