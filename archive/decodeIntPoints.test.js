const decodeIntPoints = require('./decodeIntPoints')

test('decoding to 4 int points', () => {
  let expectedPoints = [
    [ 3589431, -11072522],
    [ 3589393, -11072578],
    [ 3589374, -11072606],
    [ 3589337, -11072662]
  ]
  let actual = decodeIntPoints("vx1vilihnM6hR7mEl2Q")
  expect(actual.success).toBe(true)
  expect(actual.points).toEqual(expectedPoints)
})
