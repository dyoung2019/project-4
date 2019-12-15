const getCircularIndex = require('./getCircularIndex')

function getSegment(angle, sumOfAngles, segmentAngle) {
  return getCircularIndex(angle, sumOfAngles, segmentAngle)
}

module.exports = getSegment