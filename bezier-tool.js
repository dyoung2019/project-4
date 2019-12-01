var tool = function() {
  this.lastPoint = [0, 0]
  this.isGuideLineOn = false
  this.setPoint = (px, py) => {
    var lastPosition = this.lastPoint
    lastPosition[0] = px;
    lastPosition[1] = py;
  }
  this.toggle = () => {
    this.isGuideLineOn = !this.isGuideLineOn
  }
  this.transform = (px, py) => {
    var x = this.lastPoint[0]
    var dx = Math.abs(px - x)
    var onVertical = dx <= Number.EPSILON

    var y = this.lastPoint[1]
    var dy = Math.abs(py - this.y) 
    var onHorizontal = dy <= Number.EPSILON
    
    if (onVertical) {
      return [x, py] 
    } else if (onHorizontal) {
      return [px, screenY]
    } else {
      return [px, py]
    }
  }      
}

module.exports = tool