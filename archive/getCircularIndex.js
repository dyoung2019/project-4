const getSegmentIndex = require('./getSegmentIndex')
const getAngularOffset = require('./getAngularOffset')
const getTransformedAngle = require('./getTransformedAngle')

function getCircularIndex(angle, sumOfAngles, segmentAngle) {
  let angularOffset = getAngularOffset(segmentAngle)
  let transformedAngle = getTransformedAngle(angle, sumOfAngles, angularOffset)
  return getSegmentIndex(transformedAngle, sumOfAngles, segmentAngle)
}

module.exports = getCircularIndex