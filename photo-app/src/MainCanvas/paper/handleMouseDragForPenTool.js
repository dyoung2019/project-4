export default function handleMouseDragForPenTool (scope, segment, keyHeldDown, point) {
  const calculateDelta = (pointA, pointB) => {
    const dx = pointA.x - pointB.x
    const dy = pointA.y - pointB.y

    return [dx, dy]
  } 

  const extendPathHandles = (activePaperScope, segment, point) => {
    let [dx, dy] = calculateDelta(segment.point, point)

    segment.handleIn = new activePaperScope.Point(dx, dy)
    segment.handleOut = new activePaperScope.Point(-dx, -dy)
  }
  
  const extendPathHandleIndependently = (activePaperScope, segment, point) => {
    let [dx, dy] = calculateDelta(segment.point, point)

    segment.handleOut = new activePaperScope.Point(-dx, -dy)
  }

  if (!!segment) {
    if (keyHeldDown) {
      extendPathHandleIndependently(scope, segment, point)
    } else {
      extendPathHandles(scope, segment, point)
    }
  }
}