import { component, times } from '../renderer/renderer.js'

export const ship = (size) => (
  component('div',
    times(size, () => (
      component('div', null, { className: 'tile' })
    )),
    { className: 'ship' },
    { 'data-size': size }
  )
)
