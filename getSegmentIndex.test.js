const getSegmentIndex = require('./getSegmentIndex')

test('getSegmentIndex(-45.0, 90) is 0', () => {
  expect(getSegmentIndex(-45.0, 90.0)).toBe(0)
})

test('getSegmentIndex(315.0, 90) is 0', () => {
  expect(getSegmentIndex(315.0, 90.0)).toBe(0)
})

test('getSegmentIndex(45.0, 90) is 1', () => {
  expect(getSegmentIndex(45.0, 90.0)).toBe(1)
})

test('getSegmentIndex(0, 90) is 1', () => {
  expect(getSegmentIndex(0.0, 90.0)).toBe(1)
})