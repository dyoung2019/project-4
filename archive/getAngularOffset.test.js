var getAngularOffset = require('./getAngularOffset')

test('getAngularOffset of 90 is 45 degrees', () => {
  expect(getAngularOffset(90)).toBe(45.0)
})

test('getAngularOffset of 45 is 22.5 degrees', () => {
  expect(getAngularOffset(45)).toBe(22.5)
})

test('getAngularOffset of 180 is 90.0 degrees', () => {
  expect(getAngularOffset(180)).toBe(90.0)
})