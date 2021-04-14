import { component } from '../renderer/renderer.js'

export const header = () => (
  component('header', [
    component('h1', 'Battleship')
  ], { className: 'header'})
)
