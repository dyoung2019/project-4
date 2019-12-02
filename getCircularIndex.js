const getSegmentIndex = require('./getSegmentIndex')
const getAngularOffset = require('./getAngularOffset')
const getTransformedAngle = require('./getTransformedAngle')

function getCircularIndex(angle, noOfSegments) {
  var fullCircle = 360.0
  var segmentAngle = fullCircle / noOfSegments

  var angularOffset = getAngularOffset(noOfSegments)
  var transformedAngle = getTransformedAngle(angle, angularOffset)
  return getSegmentIndex(transformedAngle, segmentAngle)
}

module.exports = getCircularIndex