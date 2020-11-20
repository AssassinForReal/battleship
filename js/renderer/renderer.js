/**
 * @param {Element} container 
 * @param {Node | Node[] | string | string[]} components 
 */
export const render = (container, components) => {
  if (
    components === null ||
    components === undefined ||
    container === null ||
    components === undefined) return
  if (!Array.isArray(components)) {
    components = [components]
  }
  components.forEach(component => {
    if (component === null || component === undefined) {
      return
    } else if (Array.isArray(component)) {
      render(container, component)
    } else if (typeof component === 'string') {
      container.innerHTML += component
    } else if (typeof component === 'function') {
      render(container, component())
    } else {
      container.append(component)
    }
  })
}

/**
 * @param {string} tagName 
 * @param {Node | Node[] | string | string[]} children 
 * @param {HTMLElement} attributes 
 * @param {object} props
 */
export const component = (tagName, children, attributes = {}, props) => {
  const element = document.createElement(tagName)
  Object.assign(element, attributes)
  if (attributes.style) {
    Object.assign(element.style, attributes.style)
  }
  if (props) {
    Object.entries(props).forEach(([name, value]) => {
      element.setAttribute(name, value)
    })
  }
  render(element, children)
  return element
}

export const times = (count, callback) => {
  const array = []

  if (typeof count !== 'number') {
    count = parseInt(count)
  }

  for (let i = 0; i < count; i++) {
    array.push(callback(i))
  }
  return array
}

export default { render, component, times }
