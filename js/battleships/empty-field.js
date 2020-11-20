import { times } from '../renderer/renderer.js'

export const emptyField = (width, height) => (
  times(height, () => (
    times(width, () => 0)
  ))
)
