const test = require('tape')
const { createOmniValue, createDeepLazy } = require('../index')

test('omnivalue - fn', (t) => {
  const realValue = () => 42
  const omni = createOmniValue(() => realValue)
  t.equal(omni(), realValue())
  t.end()
})

test('omnivalue - obj', (t) => {
  const realValue = { a: 42 }
  const omni = createOmniValue(() => realValue)
  t.equal(omni.a, realValue.a)
  t.end()
})

test('omnivalue - number', (t) => {
  const realValue = 42
  const omni = createOmniValue(() => realValue)
  t.equal(omni.toFixed(1), realValue.toFixed(1))
  t.equal(omni.toString(16), realValue.toString(16))
  t.equal(omni + 6, 48)
  t.end()
})

test('deeplazy - fn', (t) => {
  const realValue = () => 42
  const omni = createDeepLazy(() => realValue)
  t.equal(omni(), realValue())
  t.end()
})

test('deeplazy - obj', (t) => {
  const realValue = { a: 42 }
  const omni = createDeepLazy(() => realValue)
  // t.equal(omni.a, realValue.a)
  // t.ok(omni.a === realValue.a)
  t.ok(omni.a == realValue.a)
  t.equal(Number(omni.a), Number(realValue.a))
  t.end()
})

test('deeplazy - number', (t) => {
  const realValue = 42
  const omni = createDeepLazy(() => realValue)
  t.equal(omni.toFixed(1), realValue.toFixed(1))
  t.equal(omni.toString(16), realValue.toString(16))
  t.equal(omni + 6, 48)
  t.end()
})
