function cosineMeasure(pointA, pointB) {
  let upDirection = [0.0, 1.0]

  let fromAtoB = [pointB[0] - pointA[0], pointB[1] - pointA[1]] 
  let magnitude = 1 * Math.hypot(fromAtoB)

  let dotProduct = upDirection[0] * fromAtoB[0] + upDirection[1] * fromAtoB[1]

  return  dotProduct / magnitude
}