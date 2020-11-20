import { component, times } from '../renderer/renderer.js'
import { context } from './app.js'

export const field = () => {
  const {
    fieldWidth,
    fieldHeight,
  } = context

  return component('div',
    times(fieldHeight, y => (
      component('div',
        times(fieldWidth, x => (
          component(
            'div',
            null,
            { className: 'tile' },
            { 'data-x': x, 'data-y': y })
        )),
        { className: 'row' }
      )
    )),
    { className: 'field' }
  )
}
