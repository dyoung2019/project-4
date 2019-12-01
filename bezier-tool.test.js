var Bezier = require('./bezier-tool')

test('bezier.new tool', () => {
  var tool = new Bezier()
  expect(tool).toBeDefined()
})

test('bezier set point', () => {
  var tool = new Bezier()
  tool.setPoint(13.0, 17.0)
  expect(tool.lastPoint[0]).toBe(13.0)
  expect(tool.lastPoint[1]).toBe(17.0)
})

test('bezier toggle on/off useGuideLine', () => {
  var tool = new Bezier()
  expect(tool.isGuideLineOn).toBe(false)
  tool.toggle()
  expect(tool.isGuideLineOn).toBe(true)
})

test('bezier horizontal line to (-10.0, 0.0)', () => {
  var tool = new Bezier()
  tool.setPoint(0.0, 0.0)
  var guidepoint = tool.transform(-10.0, 0)
  expect(guidepoint[0]).toBe(-10.0)
  expect(guidepoint[1]).toBe(0)
})

test('bezier horizontal line to (20.0, 0.0)', () => {
  var tool = new Bezier()
  tool.setPoint(0.0, 0.0)
  var guidepoint = tool.transform(20.0, 0)
  expect(guidepoint[0]).toBe(20.0)
  expect(guidepoint[1]).toBe(0)
})

test('bezier vertical line to (-10.0, 0.0)', () => {
  var tool = new Bezier()
  tool.setPoint(0.0, 0.0)
  var guidepoint = tool.transform(0.0, 13.0)
  expect(guidepoint[0]).toBe(0.0)
  expect(guidepoint[1]).toBe(13.0)
})

test('bezier vertical line to (20.0, 0.0)', () => {
  var tool = new Bezier()
  tool.setPoint(0.0, 0.0)
  var guidepoint = tool.transform(0.0, -10.0)
  expect(guidepoint[0]).toBe(0.0)
  expect(guidepoint[1]).toBe(-10.0)
})

var getAngularOffset = (noOfSegments) => {
  return 360.0 / (noOfSegments * 2.0)
}

var getTransformedAngle = (angle, angularOffset) => {
  var fullCircle = 360.0
  return (fullCircle + angle - angularOffset) % fullCircle
}

var getSegmentIndex = (angle, segmentAngle) => {
  var fullCircle = 360.0
  var angleOnUnitCircle = (fullCircle + angle + segmentAngle) % fullCircle

  return Math.floor(angleOnUnitCircle / segmentAngle)
}

var getCircularIndex = (angle, noOfSegments) => {
  var fullCircle = 360.0
  var segmentAngle = fullCircle / noOfSegments

  var angularOffset = getAngularOffset(noOfSegments)
  var transformedAngle = getTransformedAngle(angle, angularOffset)
  return getSegmentIndex(transformedAngle, segmentAngle)

}

var getSegment = (angle) => {
  var fullCircle = 360.0
  var segmentAngle = 90.0

  var noOfSegments = Math.floor(fullCircle / segmentAngle)
  return getCircularIndex(angle, noOfSegments)
}

test('getAngularOffset of 4 is 45 degrees', () => {
  expect(getAngularOffset(4)).toBe(45.0)
})

test('getAngularOffset of 8 is 22.5 degrees', () => {
  expect(getAngularOffset(8)).toBe(22.5)
})

test('getAngularOffset of 2 is 90.0 degrees', () => {
  expect(getAngularOffset(2)).toBe(90.0)
})

test('getTransformedAngle(0, 45.0) is 315.0 degrees', () => {
  expect(getTransformedAngle(0.0, 45.0)).toBe(315.0)
})

test('getTransformedAngle(45.0, 45.0) is 0.0 degrees', () => {
  expect(getTransformedAngle(45.0, 45.0)).toBe(0.0)
})

test('getTransformedAngle(90.0, 45.0) is 45.0 degrees', () => {
  expect(getTransformedAngle(90.0, 45.0)).toBe(45.0)
})

test('getSegmentIndex(-45.0, 90) is 0', () => {
  expect(getSegmentIndex(-45.0, 90.0)).toBe(0)
})

test('getSegmentIndex(315.0, 90) is 0', () => {
  expect(getSegmentIndex(315.0, 90.0)).toBe(0)
})

test('getSegmentIndex(45.0, 90) is 1', () => {
  expect(getSegmentIndex(45.0, 90.0)).toBe(1)
})

test('getSegmentIndex(0, 90) is 1', () => {
  expect(getSegmentIndex(0.0, 90.0)).toBe(1)
})

test('getCircularIndex(0, 4) is 0', () => {
  expect(getCircularIndex(0.0, 4)).toBe(0)
})

test('getCircularIndex(22.5, 4) is 0', () => {
  expect(getCircularIndex(22.5, 4)).toBe(0)
})

test('getCircularIndex(45.0, 4) is 1', () => {
  expect(getCircularIndex(45.0, 4)).toBe(1)
})

test('getCircularIndex(90.0, 4) is 1', () => {
  expect(getCircularIndex(90.0, 4)).toBe(1)
})

test('getCircularIndex(135.0, 4) is 2', () => {
  expect(getCircularIndex(135.0, 4)).toBe(2)
})

test('bezier on 1st quadrant', () => {
  expect(getSegment(0.0)).toBe(0)
})

test('bezier on 2nd quadrant', () => {
  expect(getSegment(90.0)).toBe(1)
})

test('bezier on 3rd quadrant', () => {
  expect(getSegment(180.0)).toBe(2)
})

test('bezier on 4th quadrant', () => {
  expect(getSegment(270.0)).toBe(3)
})

test('bezier on 1th quadrant again on 360', () => {
  expect(getSegment(360.0)).toBe(0)
})

test('bezier on 1st quadrant on 355 degree', () => {
  expect(getSegment(355.0)).toBe(0)
})