const generateAngleArray = require('./generateAngleArray')

test('get 4 elements', () => {
  let result = generateAngleArray(4)
  expect(result.length).toBe(4)
})

test('get 8 elements', () => {
  let result = generateAngleArray(8)
  expect(result.length).toBe(8)
})

test('first angle of quadrant (0, 1)', () => {
  let result = generateAngleArray(4)[0]
  expect(result[0]).toBe(0)
  expect(result[1]).toBe(1)
})

test('second angle of quadrant (-1, 0)', () => {
  let result = generateAngleArray(4)[1]
  expect(result[0]).toBe(-1)
  expect(result[1]).toBe(0)
})

test('third angle of quadrant (0, -1)', () => {
  let result = generateAngleArray(4)[2]
  expect(result[0]).toBe(0)
  expect(result[1]).toBe(-1)
})

test('fourth angle of quadrant (0, 1)', () => {
  let result = generateAngleArray(4)[3]
  expect(result[0]).toBe(1)
  expect(result[1]).toBe(0)
})