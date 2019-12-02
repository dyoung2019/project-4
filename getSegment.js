const getCircularIndex = require('./getCircularIndex')

function getSegment(angle) {
  let fullCircle = 360.0
  let segmentAngle = 90.0

  var noOfSegments = Math.floor(fullCircle / segmentAngle)
  return getCircularIndex(angle, noOfSegments)
}

module.exports = getSegment