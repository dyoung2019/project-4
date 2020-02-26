export default function drawRing (scope) {
  const drawsCircle = (c, center, size) => {
    if (c !== null) {
        c.remove();
    }    
  
    // var viewH = Math.min(size.width, size.height) / 3

    var path = new scope.Path.Circle(new scope.Point(80, 50), 30)
    path.strokeColor = 'white'
    path.strokeWidth = 10
  
    // DUPLICATE LAST POINT TO CREATE OPEN PATH THAT LOOK LIKE A CLOSED PATH
    if (path.closed) {
        var first = path.firstSegment
        var last = path.lastSegment
        var finalSegment = path.add(first.point)
        // console.log(last.handleIn)
        // console.log(first.handleOut)
        finalSegment.handleOut = last.handleIn
        finalSegment.handleIn = first.handleIn
      path.closed = false
    }
  
    var length = path.length
    //console.log(length)
    
    var halfWay = path.getLocationAt(length * 0.85)
    //console.log(halfWay)
    var splitCurve = path.splitAt(halfWay)
    splitCurve.strokeColor = 'green'
    
    // var pathLength = path.
    // shortPath.strokeColor = new Color(1, 0, 0);
    // shortPath.strokeWidth = 3
    // path.remove();
    return path;
  }
  
  const c1 = drawsCircle(null, scope.view.center, scope.view.size)
}