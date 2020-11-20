export const datasetParseInt = (dataset) => {
  const result = {}
  const keys = Object.keys(dataset)

  keys.forEach(key => {
    result[key] = parseInt(dataset[key])
  })

  return result
}
