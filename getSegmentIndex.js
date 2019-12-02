function getSegmentIndex(angle, sumOfAngles, segmentAngle) {
  let angleOnUnitCircle = (sumOfAngles + angle + segmentAngle) % sumOfAngles

  return Math.floor(angleOnUnitCircle / segmentAngle)
}

module.exports = getSegmentIndex