export const randomFloat = (min, max) => {
  return Math.random() * (max - min + 1) + min
}

export const randomInt = (min, max) => {
  return parseInt(randomFloat(min, max))
}
