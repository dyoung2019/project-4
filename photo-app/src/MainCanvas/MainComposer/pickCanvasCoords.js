export default function pickCanvasCoords (mainComp, zoomLevel, clientX, clientY) {
  // const zoomLevel = this.state.zoomLevel
  // console.log(this.mainComp)
  const canvasRect = mainComp.current.getBoundingClientRect()
  const [ix, iy] = convertToElementCoords(canvasRect, clientX, clientY)

  const sx = zoomLevel * ix
  const sy = zoomLevel * iy

  return [sx, sy]
} 