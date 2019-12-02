function getSegmentIndex(angle, segmentAngle) {
  var fullCircle = 360.0
  var angleOnUnitCircle = (fullCircle + angle + segmentAngle) % fullCircle

  return Math.floor(angleOnUnitCircle / segmentAngle)
}

module.exports = getSegmentIndex