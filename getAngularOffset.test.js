var getAngularOffset = require('./getAngularOffset')

test('getAngularOffset of 4 is 45 degrees', () => {
  expect(getAngularOffset(4)).toBe(45.0)
})

test('getAngularOffset of 8 is 22.5 degrees', () => {
  expect(getAngularOffset(8)).toBe(22.5)
})

test('getAngularOffset of 2 is 90.0 degrees', () => {
  expect(getAngularOffset(2)).toBe(90.0)
})