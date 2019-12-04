var encodeIntPoints = require('./encodeIntPoints')

test('encoding 4 int points', () => {
  let points = [
    [ 3589431, -11072522],
    [ 3589393, -11072578],
    [ 3589374, -11072606],
    [ 3589337, -11072662]
  ]

  let result = encodeIntPoints(points)
  expect(result).toBe("vx1vilihnM6hR7mEl2Q")
})
