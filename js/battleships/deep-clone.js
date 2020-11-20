export const deepClone = (obj) => {
  if (!obj) return obj
  if (Array.isArray(obj)) {
    return deepCloneArray(obj)
  }
  return deepCloneObject(obj)
}

export const deepCloneObject = (obj) => {
  const result = {}
  
  Object.keys(obj).forEach(key => {
    let value = obj[key]

    if (typeof value === 'object') {
      value = deepClone(value)
    }

    result[key] = value
  })

  return result
}

export const deepCloneArray = (array) => {
  const result = []

  for (let value of array) {
    if (typeof value === 'object') {
      value = deepClone(value)
    }

    result.push(value)
  }

  return result
}
