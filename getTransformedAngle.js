function getTransformedAngle(angle, angularOffset) {
  var fullCircle = 360.0
  return (fullCircle + angle - angularOffset) % fullCircle
}

module.exports = getTransformedAngle