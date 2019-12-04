const decodeIntPoints = require('./decodeIntPoints')

function decodePoints(value, scaleFactor)  
{  
  let points = decodeIntPoints(value)

  points.each(point => {
    point[0] *= scaleFactor
    point[1] *= scaleFactor
  })

  return point
} 

module.exports = decodePoints