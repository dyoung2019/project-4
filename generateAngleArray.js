const generateGuidelineVector = require('./generateGuideVector')

// ASSUME: from 12 o'clock going anti-clockwise
function generateAngleArray(noOfElements) {
  let angleArray = []
  const fullCircleInRadians = Math.PI * 2.0

  const segmentAngle = fullCircleInRadians / noOfElements
  for (let i = 0; i < noOfElements; i += 1) {
    angleArray.push(generateGuidelineVector(segmentAngle, i))
  }

  return angleArray
}

module.exports = generateAngleArray