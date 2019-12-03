var calculateAngleFromPoint = require('./calculateAngleFromPoint')

test(`12 o'clock is 0`, () => {
  let center = [0, 0]
  let pt = [0, 10]
  let result = calculateAngleFromPoint(center, pt)
  expect(result).toBe(0)
})

test(`6 o'clock is 180`, () => {
  let center = [0, 0]
  let pt = [0, -10]
  let result = calculateAngleFromPoint(center, pt)
  expect(result).toBe(180)
})

test(`3 o'clock is 270`, () => {
  let center = [0, 0]
  let pt = [10, 0]
  let result = calculateAngleFromPoint(center, pt)
  expect(result).toBe(270)
})

test(`9 o'clock is 90`, () => {
  let center = [0, 0]
  let pt = [-10, 0]
  let result = calculateAngleFromPoint(center, pt)
  expect(result).toBe(90)
})