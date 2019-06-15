module.exports = {
  createOmniValue,
  createDeepLazy,
}

function createOmniValue(lookupValue) {
  let cachedValue
  let didLookup = false

  const proxy = new Proxy(callDetect, {
    get: (_, key) => {
      const value = getValue()
      const child = value[key]
      if (typeof child === 'function') {
        return child.bind(value)
      }
      return child
    }
  })
  return proxy

  function callDetect() {
    const value = getValue()
    return value.apply(null, arguments)
  }

  function getValue() {
    // use cached value
    if (didLookup) return cachedValue
    // lookup + cached value
    cachedValue = lookupValue()
    didLookup = true
    return cachedValue
  }
}

function createDeepLazy(lookupValue) {
  const proxy = new Proxy(callDetect, {
    get: (_, key) => {
      console.log('get', key)
      if (key === 'valueOf') return lookupValue
      if (key === 'toString') {
        const value = lookupValue()
        if (value === undefined || value === null) return String(value)
        return value.toString()
      }
      if (key === Symbol.toPrimitive) {
        const value = lookupValue()
        if (value === undefined || value === null) return value
        return value[Symbol.toPrimitive]
      }
      console.log('deep@', key)
      return createDeepLazy(() => {
        const value = lookupValue()
        if (value === undefined || value === null) return value
        return value[key]
      })
    }
  })
  return proxy

  function callDetect() {
    const value = lookupValue()
    return value.apply(null, arguments)
  }
}
