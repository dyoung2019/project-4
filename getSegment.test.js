const getSegment = require('./getSegment')

test('bezier on 1st quadrant', () => {
  expect(getSegment(0.0)).toBe(0)
})

test('bezier on 2nd quadrant', () => {
  expect(getSegment(90.0)).toBe(1)
})

test('bezier on 3rd quadrant', () => {
  expect(getSegment(180.0)).toBe(2)
})

test('bezier on 4th quadrant', () => {
  expect(getSegment(270.0)).toBe(3)
})

test('bezier on 1th quadrant again on 360', () => {
  expect(getSegment(360.0)).toBe(0)
})

test('bezier on 1st quadrant on 355 degree', () => {
  expect(getSegment(355.0)).toBe(0)
})