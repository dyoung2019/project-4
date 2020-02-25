export default function performHitTest (scope, point) {    
  // CUSTOM LATER
  const hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
  }

  return scope.project.hitTest(point, hitOptions)
}    