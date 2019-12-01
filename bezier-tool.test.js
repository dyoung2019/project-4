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