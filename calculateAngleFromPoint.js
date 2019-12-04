const toDegrees = 180 / Math.PI

function dotProductWithUpVector(direction) {
  let upDirection = [0.0, 1.0]
  return upDirection[1] * direction[1]
}

function roundToRightHandDegrees(angleInRadians, pointA, pointB) {
  let xOfPointA = pointA[0]
  let xOfPointB = pointB[0]

  // 0 to 180 
  let angleInDegrees = angleInRadians * toDegrees

  let antiClockwiseAngle = angleInDegrees
  if (xOfPointB > xOfPointA) {
    antiClockwiseAngle = (360.0 - angleInDegrees) % 360.0
  }
  return antiClockwiseAngle
}

function calculateAngleFromPoint(pointA, pointB) {
  let [ xOfPointA, yOfPointA ] = pointA
  let [ xOfPointB, yOfPointB ] = pointB
  let direction = [xOfPointB - xOfPointA, yOfPointB - yOfPointA] 

  let magnitude = Math.hypot(...direction)
  let dotProduct = dotProductWithUpVector(direction)

  let angleInRadians =  Math.acos(dotProduct / magnitude)
  return Math.fround(roundToRightHandDegrees(angleInRadians, pointA, pointB))
}

module.exports = calculateAngleFromPoint