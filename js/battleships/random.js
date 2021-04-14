export const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min
}

export const randomInt = (min, max) => {
  return parseInt(randomFloat(min, max + 1))
}
