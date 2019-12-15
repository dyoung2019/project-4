const encodeIntPoints = require('./encodeIntPoints')

function encodePoints(points, scaleFactor) {  
  let transformedPoints = points.map(point => {
    return [point[0] * scaleFactor, point[1] * scaleFactor]
  })
  return encodeIntPoints(transformedPoints)
}  

module.exports = encodePoints