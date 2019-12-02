const getTransformedAngle = require('./getTransformedAngle')

test('getTransformedAngle(0, 45.0) is 315.0 degrees', () => {
  expect(getTransformedAngle(0.0, 45.0)).toBe(315.0)
})

test('getTransformedAngle(45.0, 45.0) is 0.0 degrees', () => {
  expect(getTransformedAngle(45.0, 45.0)).toBe(0.0)
})

test('getTransformedAngle(90.0, 45.0) is 45.0 degrees', () => {
  expect(getTransformedAngle(90.0, 45.0)).toBe(45.0)
})