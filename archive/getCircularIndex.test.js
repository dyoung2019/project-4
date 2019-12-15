const getCircularIndex = require('./getCircularIndex')

test('getCircularIndex(0, 360.0, 90.0) is 0', () => {
  expect(getCircularIndex(0.0, 360.0, 90.0)).toBe(0)
})

test('getCircularIndex(22.5, 360.0, 90.0) is 0', () => {
  expect(getCircularIndex(22.5,360.0, 90.0)).toBe(0)
})

test('getCircularIndex(45.0, 360.0, 90.0) is 1', () => {
  expect(getCircularIndex(45.0, 360.0, 90.0)).toBe(1)
})

test('getCircularIndex(90.0, 360.0, 90.0) is 1', () => {
  expect(getCircularIndex(90.0, 360.0, 90.0)).toBe(1)
})

test('getCircularIndex(135.0, 360.0, 90.0) is 2', () => {
  expect(getCircularIndex(135.0, 360.0, 90.0)).toBe(2)
})