const getCircularIndex = require('./getCircularIndex')

class BezierTool {
  constructor() {
    this.isGuideLineOn = false
    this.lastPoint = [0, 0]
  }

  toggle() {
    this.isGuideLineOn = !this.isGuideLineOn
  }

  transform(px, py) {
    let x = this.lastPoint[0]
    let dx = Math.abs(px - x)
    let onVertical = dx <= Number.EPSILON

    let y = this.lastPoint[1]
    let dy = Math.abs(py - y) 
    let onHorizontal = dy <= Number.EPSILON
    
    if (onVertical) {
      return [x, py] 
    } else if (onHorizontal) {
      return [px, y]
    } else {
      return [px, py]
    }
  }
  
  setPoint(px, py) {
    let lastPosition = this.lastPoint
    lastPosition[0] = px;
    lastPosition[1] = py;
  }

  getSegment(angle) {
    let fullCircle = 360.0
    let segmentAngle = 90.0
  
    var noOfSegments = Math.floor(fullCircle / segmentAngle)
    return getCircularIndex(angle, noOfSegments)
  }
}

module.exports = {
  BezierTool
}