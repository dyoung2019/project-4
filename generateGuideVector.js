function clampDownToZero(value) {
  if (Math.abs(value) <= Number.EPSILON) {
    return 0.0
  } else {
    return value;
  }
}

function generateGuidelineVector(segmentAngle, i) {
  let currentAngle = segmentAngle * i
  let xComponent = -Math.sin(currentAngle)
  let yComponent = Math.cos(currentAngle)
  return [clampDownToZero(xComponent), clampDownToZero(yComponent)]
}

module.exports = generateGuidelineVector