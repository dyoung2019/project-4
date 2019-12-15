function getTransformedAngle(angle, sumOfAngles, angularOffset) {
  return (sumOfAngles + angle - angularOffset) % sumOfAngles
}

module.exports = getTransformedAngle